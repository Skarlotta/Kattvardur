import {Field} from '../../lib/Fields'

export interface FormProps {
    endpoint : string;
}

export interface FieldMap{
    [key : string] : Field[]
}

export interface SinglePageFormProps {
    onSubmit: (data: any, resolve?: any) => void;
    fields: FieldMap
}