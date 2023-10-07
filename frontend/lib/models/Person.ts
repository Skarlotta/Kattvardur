import { Person,ApiShow, Show} from '../../lib/types';
import { jsonFetch } from '../../fetcher';

export const PersonManager = {
    get : async (id : string) : Promise<Person>=> {
        return await jsonFetch("/api/v1/person/"+id+"/")
    }
}