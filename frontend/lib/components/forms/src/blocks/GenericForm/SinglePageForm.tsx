import { SinglePageFormProps } from "./types";
import { transformField } from "./util";
import { useForm } from "react-hook-form";

export const SinglePageForm = ({
    onSubmit,
    fields
} : SinglePageFormProps) => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const fieldComponents = fields.map((f) => transformField(f, register, errors));
    
    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            {fieldComponents}
            <button type="submit">Submit</button>
        </form>
    </>
}