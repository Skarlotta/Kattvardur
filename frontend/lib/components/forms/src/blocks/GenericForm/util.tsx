import { text } from "stream/consumers";
import { Field } from "../../lib/Fields";

export const transformField = (field : Field, register: any, errors: any) => {
    console.log(register, errors);
    switch(field.type){
        case 'date' : {
            return <div key={field.key} >
                {errors[field.key] && <><span>{errors[field.key].message}</span><br/></>}
                {errors[field.key] && errors[field.key].type === "required" && <><span>this_field_is_required</span><br/></>}
                {field.label && field.label + (field.required ? "*" :"")}
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
            return <div key={field.key} >
                {errors[field.key] && <><span>{errors[field.key].message}</span><br/></>}
                {errors[field.key] && errors[field.key].type === "required" && <><span>this_field_is_required</span><br/></>}
                {field.label && field.label + (field.required ? "*" :"")}
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
            return <div key={field.key} >
                {errors[field.key] && <><span>{errors[field.key].message}</span><br/></>}
                {errors[field.key] && errors[field.key].type === "required" && <><span>this_field_is_required</span><br/></>}
                {field.label && field.label + (field.required ? "*" :"")}
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