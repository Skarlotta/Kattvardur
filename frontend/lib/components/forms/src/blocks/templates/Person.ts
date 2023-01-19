import { Field, Fields } from "../../lib/Fields";

export const Person: Field[] = [
    {...Fields.name, halfWidth:true},
    {...Fields.ssn, halfWidth:true},
    {...Fields.address, halfWidth:true, doubleHeight:true},
    {...Fields.postcode, halfWidth:true},
    {...Fields.country, halfWidth:true},
    {...Fields.telephone, halfWidth:true},
    {...Fields.email, halfWidth:true},
]