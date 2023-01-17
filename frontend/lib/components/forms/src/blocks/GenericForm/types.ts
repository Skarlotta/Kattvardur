import {Field} from '../../lib/Fields'

export interface FormProps {
    endpoint : string;
}

export interface SinglePageFormProps {
    onSubmit: (data: any) => void;
    fields: Field[];
}