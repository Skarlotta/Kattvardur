import { Field, Fields } from "../../lib/Fields";

export const Housecat: Field[] = [
    Fields.name,
    {...Fields.gender, halfWidth:true},
    {...Fields.birthdate, halfWidth:true},
    {...Fields.ems, pattern: {
        value: /^(HCL)|(HCS) [a-z]*(( [0-9 ]*(var)?))?$/i,
        message : 'forms_invalid_ems_format'
    },},
    {...Fields.microchip, halfWidth:true},
    {...Fields.registry_number, halfWidth:true}
]