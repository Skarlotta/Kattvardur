interface ModelInterface {
    readonly url : string;
    defaultObject() : any;
    save() : void;

    object: any;
}

class Model implements ModelInterface{
    object:any;
    url: string =  "";

    constructor(object?:any){
        this.object = object ? object : this.defaultObject();
    }

    defaultObject() : any{
        return {
            id : ""
        };
    }

    save(): void {
        return;
    }
}


export default Model;
export type {Model, ModelInterface};