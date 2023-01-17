import { Field, FieldKey } from "../types/Field";

export type FieldDict = {
    [K in FieldKey] : Field
}

export const Fields:FieldDict = {
    'name' : {
        type: 'text',
        key: 'name',
        label:"name",
        required:true,
    }, 
    'ems' : {
        type: 'text',
        key: 'ems',
        label:"ems",
        pattern: {
            value: /^[a-z]{3} [a-z]*(( [0-9 ]*(var)?))?$/i,
            message : 'forms_invalid_ems_format'
        },
        required:true,
    },    
    'gender' : {
        type: 'select',
        key: 'gender',
        label:"gender",
        values: [
            {key : 'male', value:'male'},
            {key : 'female', value:'female'},
        ],
        required:true,
    },   
    'birthdate' : {
        type: 'date',
        key: 'birthdate',
        label:"birthdate",
        required:true,
    },   
    'microchip' : {
        type: 'text',
        key: 'microchip',
        label:"microchip",
        required:true,
        pattern: {
            value: /^[0-9]*$/i,
            message : 'forms_invalid_microchip_format'
        }
    }, 
    'registry_number' : {
        type: 'text',
        key: 'registry_number',
        label:"registry_number",
        required:true,
        pattern: {
            value: /^[A-Z]*[0-9]*$/i,
            message : 'forms_invalid_regnr_format'
        }
    }, 
    'ssn' : {
        type: 'text',
        key: 'ssn',
        label:"ssn",
        required:true,
        pattern: {
            value: /^[0-3][0-9][0-1][0-9]{6}[8,9,0]$/,
            message : 'forms_invalid_ssn_format'
        }
    },
    'address' : {
        type: 'text',
        key: 'address',
        label:"address",
        required:true,
    },
    'postcode' : {
        type: 'text',
        key: 'postcode',
        label:"postcode",
        required:true,
    },
    'country' : {
        type: 'text',
        key: 'country',
        label:"country",
        required:true,
    },
    'telephone' : {
        type: 'text',
        key: 'telephone',
        label:"telephone",
        required:false,
    },
    'email' : {
        type: 'email',
        key: 'email',
        label:"email",
        required:false,
    },
    'file' : {
        type: 'file',
        key: 'file',
        label:"file",
        required:false,
    },
}