import { SinglePageFormProps } from "./types";
import { transformField } from "./util";
import { useForm } from "react-hook-form";
import styles from "../../../../../styles/forms.module.css";

export const SinglePageForm = ({
    onSubmit,
    fields
} : SinglePageFormProps) => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const fieldComponents = fields.map((f) => transformField(f, register, errors));
    
    return <>
        <form className={styles.styledForm} onSubmit={handleSubmit(onSubmit)}>
            {fieldComponents}
            <button type="submit">Submit</button>
        </form>
    </>
}