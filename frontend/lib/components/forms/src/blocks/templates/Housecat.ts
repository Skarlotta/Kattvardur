import { Field, Fields } from "../../lib/Fields";

export const Housecat: Field[] = [
    Fields.name,
    {...Fields.gender, halfWidth:true},
    {...Fields.birth_date, halfWidth:true},
    {...Fields.colors, pattern: {
        value: /^(HCL)|(HCS) [a-z]*(( [0-9 ]*(var)?))?$/i,
        message : 'forms_invalid_ems_format'
    },},
    {...Fields.microchips, halfWidth:true},
    {...Fields.organization, halfWidth:true},
    {...Fields.registries, halfWidth:true},
    {...Fields.registry_date, halfWidth:true},
    {...Fields.is_imported, halfWidth:true}
]
