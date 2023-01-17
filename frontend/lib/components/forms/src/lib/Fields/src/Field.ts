import { FormField, FieldKey } from "../types/Field";

export type FieldDict = {
    [K in FieldKey] : FormField
}

export const Field:FieldDict = {
    'name' : {
        type: 'text',
        key: 'name',
        pattern: {
            value: /^.+$/i,
            message : 'forms_string_cannot_be_empty'
        }
    }, 
    'ems' : {
        type: 'text',
        key: 'name',
        pattern: {
            value: /^[a-z]{3} [a-z]*(( [0-9 ]*(var)?))?$/i,
            message : 'forms_invalid_ems_format'
        }
    },
}