import { text } from "stream/consumers";
import { Field } from "../../lib/Fields";
import styles from "../../../../../styles/forms.module.css";
import { FieldMap } from "./types";
import { FieldValues, UseFormRegister } from "react-hook-form";
import CountrySelector from "../../lib/Fields/src/CountrySelector";


const constructClassName = (field : Field) => {
    const w = field.halfWidth ? styles.halfwidth : field.thirdWidth ? styles.thirdwidth : field.quarterWidth ? styles.quarterwidth : "";    
    const h = field.doubleHeight ? styles.doubleheight : ""
    
    return w +" " + h;
}

export const transformFieldMap = (fieldmap : FieldMap, register: UseFormRegister<FieldValues>, errors: any) => {
    let r : JSX.Element[] = [];
    for(const key in fieldmap){
        const fields = fieldmap[key];
        r = r.concat(fields.map(f => transformField(f, register, errors, key)))
    }
    return r;
}

export const transformField = (field : Field, register: UseFormRegister<FieldValues>, errors: any, prefix : string = "") => {
    const key = prefix + "_" + field.key;
    switch(field.type){
        case 'date' : {
            return <div key={key}                 
                className={constructClassName(field)}         
            >
                {errors[key] && <><span>{errors[key].message}</span><br/></>}
                {errors[key] && errors[key].type === "required" && <><span>this_field_is_required</span><br/></>}
                {field.label && <label>{field.label + (field.required ? "*" :"")}</label>}
                <input    
                type='date'  
                {
                    ...register(key, {
                        ...field
                    })
                }>
                    {field.values?.map(v => <option key={v.key} value={v.key}>{v.value}</option>)}
                </input>

            </div>
        }
        case 'select' : {
            return <div key={key} 
                className={constructClassName(field)}  
            >
                {errors[key] && <><span>{errors[key].message}</span><br/></>}
                {errors[key] && errors[key].type === "required" && <><span>this_field_is_required</span><br/></>}
                {field.label && <label>{field.label + (field.required ? "*" :"")}</label>}
                <select                 
                {
                    ...register(key, {
                        ...field
                    })
                }>
                    {field.values?.map(v => <option key={v.key} value={v.key}>{v.value}</option>)}
                </select>

            </div>
        }
        case 'email':
        case 'text' : {
            return <div key={key} 
                className={constructClassName(field)} 
            >
                {errors[key] && <><span>{errors[key].message}</span><br/></>}
                {errors[key] && errors[key].type === "required" && <><span>this_field_is_required</span><br/></>}
                {field.label && <label>{field.label + (field.required ? "*" :"")}</label>}
                <input 
                type={field.type}
                placeholder={field.placeholder}
                {
                    ...register(key, {
                        ...field
                    })
                }
                ></input>

            </div>
        }

        case 'checkbox' :{
            return <div key={key} 
            className={constructClassName(field)} 
        >
            {errors[key] && <><span>{errors[key].message}</span><br/></>}
            {errors[key] && errors[key].type === "required" && <><span>this_field_is_required</span><br/></>}
            {field.label && <label>{field.label + (field.required ? "*" :"")}</label>}
            <input 
            type='checkbox' 
            defaultChecked={field.value}
            {
                ...register(key, {
                    ...field
                })
            }
            ></input>

        </div>
        }

        case 'country':{
            return <div key={key} 
            className={constructClassName(field)} 
        >
            {errors[key] && <><span>{errors[key].message}</span><br/></>}
            {errors[key] && errors[key].type === "required" && <><span>this_field_is_required</span><br/></>}
            {field.label && <label>{field.label + (field.required ? "*" :"")}</label>}
            <CountrySelector/>

        </div>
        }
        default : {
            return <b>Missing field definition  &quot;{field.type}&quot;</b>;
        }
    }
}

function getCookie(name : string) {
    var cookieValue = null;
    if(typeof(document) === 'undefined'){
        return 'nooooo';
    }
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const CSRFTokenString = () => {
    return getCookie('csrftoken');
}

export const CSRFToken = () => {
    const cookie = getCookie('csrftoken')
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={cookie || ''} />
    );
};