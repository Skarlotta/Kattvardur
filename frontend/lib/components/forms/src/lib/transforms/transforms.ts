import { jsonFetch } from "../../../../../../fetcher";
import { Cat, Microchip, Registry, Color, Organization } from "../../../../../types"



export const transformHouseCat = async (cat : any) : Promise<Cat> => {
    const microchip : Microchip = {
        microchip : cat.microchips
    };

    const orgId = cat.registries.match(/([a-zA-Zá-öÁ-Ö]+) ?([0-9]+)/);
    if(!orgId || orgId.length < 3){
        throw "Invalid Organization code"
    }
    console.log("catdata", cat);
    console.log(cat.registry);
    console.log(cat.imported);
    console.log("orgID", orgId);
    const organization = await jsonFetch<Organization[]>(`/api/v1/organization?search=${orgId[1]}`);

    if(organization.length === 0){
        throw "No valid organization"
    }
    const registry : Registry = {
        registry_date : cat.registry_date,
        imported : cat.is_imported,
        registry_number : orgId[2],
        active : true,
        organization : organization[0].id
    }
    const ems : Color = {
        ems : cat.colors
    }
   //delete cat.imported;
    //delete cat.registry;
    const c = {
        ...cat,
        isMale : cat.isMale === 'male',
        registries : [registry],
        colors : [ems],
        microchips : [microchip]
    }
    console.log(c);
    return c;
}