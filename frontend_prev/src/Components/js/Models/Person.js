import React from 'react';
import Model from './Model';


class Person extends Model {
    constructor(obj){
        super();
        this.formFields = [
            this.formfield("name","Nafn", "string"),
            this.formfield("ssn","Kennitala", "string"),
            this.formfield("address", "Heimilisfang", "string"),
            this.formfield("postcode", "Póstfang", "string"),
            this.formfield("city", "Borg", "string"),
            this.formfield("country","Land", "country"),
            this.formfield("email", "Netfang", "email"),
            this.formfield("phone","Símanúmer", "string"),
        ]
        this.url="/person";
    }

    emptyObject(){
        return {
            id:null,
            name:"",
            ssn:"",
            address:"",
            postcode:"",
            city:"",
            country:"",
            email:"",
            phone:"",
            is_member : false,
            member_id : false
        };
    }

    row(){
        return <tr key={id}>
            <td>
                {this.obj.name}
            </td>
            <td>
                {this.obj.is_member ? this.obj.member_id : "Ekki Félagi"}
            </td>
            <td>
                {this.obj.email}
            </td>
            <td>
                {this.obj.address} - {this.obj.postcode}{this.obj.city}
            </td>
        </tr>;
    }

    validateObject(){
        return true;
    }
}


export default Person;