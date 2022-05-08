import fetcher from '../../../../fetcher';
import {GenericSearch} from '../genericSearch/genericSearch';
import {GenericSearchResult} from '../genericSearch/searchresults';
import {Cattery} from '../../../types';


const styleData = (cattery:Cattery) => {
    return <GenericSearchResult
        url={'/cattery/'+cattery.id+"/"}
        key={cattery.id}
        heading={cattery.name}
        subheading={cattery.country || ""}
        topString={(cattery.address||"Ekkert heimilisfang") + ", " + (cattery.city||"óþekkt borg") + ", " + (cattery.country||"Óþekkt land")}
        bottomString={(cattery.email||"Ekkert tölvupóstfang") + " - " + (cattery.phone||"Ekkert símanúmer") + " - " + (cattery.website||"Ekkert vefsvæði")}
    />
}

export const CatterySearch = () => {
    return <GenericSearch
        title="Ræktunaleit"
        url="/api/v1/cattery/"
        styleData={styleData}
    />
}
