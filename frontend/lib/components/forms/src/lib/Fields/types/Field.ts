export type FieldKey = 'name'
    | 'ems'
;

export type FieldTypes = 'text'
    | 'select'
    | 'checkbox'
;

interface FieldValue {
    key : string,
    value : string
}

interface validation {
    value : RegExp,
    message : string,
}

export interface FormField {
    type: FieldTypes,
    key: string,
    values?: FieldValue[],
    checked? : boolean,
    value? : any,
    label? : string,
    required?: boolean,
    pattern?: validation,
}