import { SinglePageFormProps } from "./types";
import { CSRFToken, transformFieldMap } from "./util";
import { useForm } from "react-hook-form";
import styles from "../../../../../styles/forms.module.css";

interface dict {
    [key : string] : any
}
interface dataMap {
    [key : string] : dict
}

const submissionFactory = (onSubmit : (data: any) => void) => {
    return (data : any) => {
        const returnDict : dataMap = {};
        for(const key in data){
            const prefix = key.split("_")[0];
            const _key = key.split("_")[1];
            returnDict[prefix] = {
                ...returnDict[prefix],
                [_key] : data[key]
            }
        }
        onSubmit(returnDict);
    }
}

export const SinglePageForm = ({
    onSubmit,
    fields
} : SinglePageFormProps) => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const fieldComponents = transformFieldMap(fields, register, errors)
    
    return <>
        <form className={styles.styledForm} onSubmit={handleSubmit(submissionFactory(onSubmit))}>
            <CSRFToken/>
            {fieldComponents}
            <button type="submit">Submit</button>
        </form>
    </>
}