export type FieldKey = 'name'
    | 'gender'
    | 'ems'
    | 'birthdate'
    | 'microchip'
    | 'registry_number'
    | 'ssn'
    | 'address'
    | 'postcode'
    | 'country'
    | 'telephone'
    | 'email'
    | 'file'
;

export type FieldTypes = 'text'
    | 'select'
    | 'checkbox'
    | 'date'
    | 'email'
    | 'file'
;

interface FieldValue {
    key : string,
    value : string
}

interface validation {
    value : RegExp,
    message : string,
}

export interface Field {
    type: FieldTypes,
    key: string,
    values?: FieldValue[],
    checked? : boolean,
    value? : any,
    label? : string,
    required?: boolean,
    pattern?: validation,
    placeholder?: string,
    halfWidth?: boolean,
    thirdWidth?: boolean,
    quarterWidth?: boolean,
}