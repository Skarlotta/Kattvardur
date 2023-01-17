import { Field, Fields } from "../../lib/Fields";

export const Housecat: Field[] = [
    Fields.name,
    Fields.gender,
    Fields.birthdate,
    {...Fields.ems, pattern: {
        value: /^(HCL)|(HCS) [a-z]*(( [0-9 ]*(var)?))?$/i,
        message : 'forms_invalid_ems_format'
    },},
    Fields.microchip,
    Fields.registry_number
]