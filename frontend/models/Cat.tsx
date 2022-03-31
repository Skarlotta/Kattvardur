import Model from './Model';
import Cattery from './Cattery';
import fetcher from '../fetcher';

interface CatEms {
    date : Date,
    ems : string
}

interface Registration  {
    Organization : number,
    registry_date : Date,
    registry_number : string, 
    registry : string, 
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
    microchips : any[],
    colors : CatEms[],
    registries : Registration[]
}


class Cat extends Model{
    url:string = "/cat";
    object:CatObject;   
    cattery?:Cattery = undefined; 
    
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
            microchips : [],
            colors : [],
            registries : []
        };
    }

    getCattery() : Promise<Cat> {
        if(!this.object.cattery){
            return new Promise<Cat>((resolve, fail) => {
                resolve(this);
            });
        }
        return new Promise<Cat>((resolve, fail) => {
            fetcher("/api/v1/cattery/"+this.object.cattery?.toString()+"/").then(data =>{ 
                this.cattery = new Cattery(data);
                resolve(this);
            });
        });
    }
}

export default Cat;
export type {CatObject}