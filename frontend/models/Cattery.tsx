import Model from './Model';

interface CatteryObject {
    id:string,
    registry_date?:Date,
    name:string,
    country:string,
    prefix : boolean,
    oragnization?:number,
    email:string,
    address:string,
    city:string,
    postcode:string,
    website:string,
    phone:string,
}


class Cattery extends Model{
    url:string = "/cattery";
    object:CatteryObject;    
    
    constructor(object?:CatteryObject){
        super(object);
        this.object = object ? object : this.defaultObject();
    }

    defaultObject() : CatteryObject{
        return {
            id:"",
            registry_date:undefined,
            name:"",
            country:"",
            prefix : true,
            oragnization:undefined,
            email:"",
            address:"",
            city:"",
            postcode:"",
            website:"",
            phone:"",
        };
    }
}

export default Cattery;
export type {CatteryObject}