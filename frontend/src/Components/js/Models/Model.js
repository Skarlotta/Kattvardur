import React from 'react';
import CountrySelector from '../misc/CountrySelector';


class Model{
    constructor(obj){
        if(obj){
            this.obj = obj;
        } else{
            this.obj = this.emptyObject();
        }

        this.formFields = [];
    }

    formfield(name, label, type){
        let types = ["string","int","date","bool","float", "country", "email"];
        if(types.indexOf(type) == -1){
            throw type+" is not a valid form type";
        }
        return [name, label, type];
    }

    emptyObject(){
        return {};
    }

    row(){
        return <div>
            <i>Children must implement row</i>
        </div>;
    }

    setField(field, value){
        this.obj[field] = value;
    }

    form(onChange, warnings = {}, exclude = [], readonly = [], ){
        let fields = this.formFields.map(x => {
            let name = x[0];
            let label = x[1];
            let type = x[2];
            let form = null;
            let included = exclude.indexOf(name) == -1;
            if(!included){
                return null;
            }
            let readOnly = readonly.indexOf(name) >= 0;
            let onChangeFunction = readOnly ? (e)=>{} : e => onChange(name, e.target.value);

            switch(type){
                case "string":{
                    form = <input readOnly={readOnly} onChange={onChangeFunction} value={this.obj[name]}></input>
                    break;
                }
                case "int":{
                    form = <input type="number" readOnly={readOnly} onChange={onChangeFunction} value={this.obj[name]}></input>
                    break;
                }
                case "date":{                    
                    form = <input type="date" readOnly={readOnly} onChange={onChangeFunction} value={this.obj[name]}></input>
                    break;
                }
                case "bool":{                   
                    form = <input type="checkbox" readOnly={readOnly} onChange={onChangeFunction} checked={this.obj[name]}></input>
                    break;
                }
                case "float":{
                    form = <input type="number" readOnly={readOnly} onChange={onChangeFunction} checked={this.obj[name]}></input>
                    break;
                }
                case "country":{
                    form = <CountrySelector onChange={onChangeFunction} value={this.obj[name]}></CountrySelector>

                    break;
                }
                case "email":{                    
                    form = <input type="email" readOnly={readOnly} onChange={onChangeFunction} checked={this.obj[name]}></input>
                    break;
                }
            }
            
            return <span className='form-span'>
                <span className="warning">{warnings[name] || ""}</span> 
                <label>{label}</label> 
                {form}
            </span>;
        });

        return <div className='form-div'>
            {fields}
        </div>
    }

    validateObject(){
        return true;
    }
}

export default Model;