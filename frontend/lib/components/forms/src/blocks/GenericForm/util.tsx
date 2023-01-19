import { text } from "stream/consumers";
import { Field } from "../../lib/Fields";
import styles from "../../../../../styles/forms.module.css";


const constructClassName = (field : Field) => {
    const w = field.halfWidth ? styles.halfwidth : field.thirdWidth ? styles.thirdwidth : field.quarterWidth ? styles.quarterwidth : "";    
    const h = field.doubleHeight ? styles.doubleheight : ""
    
    return w +" " + h;
}

export const transformField = (field : Field, register: any, errors: any) => {
    switch(field.type){
        case 'date' : {
            return <div key={field.key}                 
                className={constructClassName(field)}         
            >
                {errors[field.key] && <><span>{errors[field.key].message}</span><br/></>}
                {errors[field.key] && errors[field.key].type === "required" && <><span>this_field_is_required</span><br/></>}
                {field.label && <label>{field.label + (field.required ? "*" :"")}</label>}
                <input    
                type='date'  
                {
                    ...register(field.key, {
                        ...field
                    })
                }>
                    {field.values?.map(v => <option key={v.key} value={v.key}>{v.value}</option>)}
                </input>

            </div>
        }
        case 'select' : {
            return <div key={field.key} 
                className={constructClassName(field)}  
            >
                {errors[field.key] && <><span>{errors[field.key].message}</span><br/></>}
                {errors[field.key] && errors[field.key].type === "required" && <><span>this_field_is_required</span><br/></>}
                {field.label && <label>{field.label + (field.required ? "*" :"")}</label>}
                <select                 
                {
                    ...register(field.key, {
                        ...field
                    })
                }>
                    {field.values?.map(v => <option key={v.key} value={v.key}>{v.value}</option>)}
                </select>

            </div>
        }
        case 'text' : {
            return <div key={field.key} 
                className={constructClassName(field)} 
            >
                {errors[field.key] && <><span>{errors[field.key].message}</span><br/></>}
                {errors[field.key] && errors[field.key].type === "required" && <><span>this_field_is_required</span><br/></>}
                {field.label && <label>{field.label + (field.required ? "*" :"")}</label>}
                <input 
                type='text' 
                placeholder={field.placeholder}
                {
                    ...register(field.key, {
                        ...field
                    })
                }
                ></input>

            </div>
        }
    }
}