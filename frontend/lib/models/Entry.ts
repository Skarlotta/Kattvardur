import { Person, ApiShow, Show,Entry} from '../../lib/types';
import { jsonFetch } from '../../fetcher';
import { PersonManager } from './Person';

export const EntryManager = {    
    get : async (show_id : string, id : string) : Promise<Entry | undefined>=> {
        const entry : Entry = await jsonFetch("/api/v1/show/"+show_id+"/entry/"+id);
        return entry;
    },
    all : (async (show_id : string) => {
        const entries : Entry[] = await jsonFetch("/api/v1/show/"+show_id+"/entry/");
        return entries;
    }),

}