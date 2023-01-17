import {FormField} from '../../lib/Fields'

export interface SinglePageFormProps {
    onSubmit: (data: any) => void;
    fields: FormField[];
}