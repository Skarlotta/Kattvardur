import Model from './Model';

interface CatEms {
    date : Date,
    ems : string
    
}

interface Registration  {
    Organization : number,
    registry_date : Date,
    registry_number : string, 
    active : boolean,
    imported : boolean
}

interface CatObject {
    id : string,
    name : string,
    registration_class : string,
    country : string,
    isMale : boolean,
    neuter? : Date,
    dam? : number,
    sire? : number,
    cattery? : number,
    microchip : string[],
    colors : CatEms[],
    registries : Registration[]
}


class Cat extends Model{
    url:string = "/cat";
    object:CatObject;    
    
    constructor(object?:CatObject){
        super(object);
        this.object = object ? object : this.defaultObject();
    }

    defaultObject() : CatObject{
        return {
            id:"",
            name : "",
            registration_class : "",
            country : "",
            isMale : true,
            neuter : undefined,
            dam : undefined,
            sire : undefined,
            cattery : undefined,
            microchip : [],
            colors : [],
            registries : []
        };
    }
}

export default Cat;
export type {CatObject}