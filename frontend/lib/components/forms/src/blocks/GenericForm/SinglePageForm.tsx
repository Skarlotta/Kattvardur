import { SinglePageFormProps } from "./types";
import { CSRFToken, transformFieldMap } from "./util";
import { useForm,} from "react-hook-form";
import styles from "../../../../../styles/forms.module.css";
import { useState } from 'react';
import { SubmissionConfirmed } from "./SubmissionConfirmed";

interface dict {
    [key : string] : any
}
interface dataMap {
    [key : string] : dict
}

const submissionFactory = (onSubmit : (data: any, resolve: any) => void, setLoading: any, reset : any, showConfirm : any) => {
    return (data : any) => {
        setLoading(true);
        const returnDict : dataMap = {};
        for(const key in data){
            const prefix = key.split("_")[0];
            const _key = key.split("_").slice(1).join("_");
            returnDict[prefix] = {
                ...returnDict[prefix],
                [_key] : data[key]
            }
        }
        onSubmit(returnDict, (success : boolean, message : string, redirectLink : string) => {
            reset();
            showConfirm(success, message, redirectLink);
            setLoading(false);
        });
    }
}

export const SinglePageForm = ({
    onSubmit,
    fields
} : SinglePageFormProps) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [showSubmissionConfirmation, setShowSubmissionConfirmation] = useState(false);
    const [submissionLink, setSubmissionLink] = useState("");
    const [success, setSuccess] = useState(true);
    const [message, setMessage] = useState("");
    const fieldComponents = transformFieldMap(fields, register, errors, loading);
    const submit = handleSubmit(submissionFactory(onSubmit, setLoading, reset, (success : boolean, message : string, link : string) => {
        setSubmissionLink(link);
        setMessage(message);
        setSuccess(success);
        setShowSubmissionConfirmation(true);
    }))
    
    return <>
        <form className={styles.styledForm} onSubmit={submit}>
            <CSRFToken/>
            {fieldComponents}
            <button disabled={loading} type="submit">Submit</button>
        </form>
        {
            showSubmissionConfirmation &&  <SubmissionConfirmed success = {success} onClose = {setShowSubmissionConfirmation} message={message} redirectLink={submissionLink}/>
        }
    </>
}