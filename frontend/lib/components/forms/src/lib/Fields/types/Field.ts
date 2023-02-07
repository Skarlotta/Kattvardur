export type FieldKey = 'name'
    | 'gender'
    | 'colors'
    | 'birth_date'
    | 'microchips'
    | 'registries'
    | 'ssn'
    | 'address'
    | 'postcode'
    | 'country'
    | 'telephone'
    | 'email'
    | 'file'
    | 'registry_date'
    | 'is_imported'
;

export type FieldTypes = 'text'
    | 'select'
    | 'checkbox'
    | 'date'
    | 'email'
    | 'file'
    | 'country'
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
    doubleHeight?: boolean,
}