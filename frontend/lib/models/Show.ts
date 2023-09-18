import { Person,ApiShow, Show} from '../../lib/types';
import { jsonFetch } from '../../fetcher';
import { PersonManager } from './Person';

export const ShowManager = {
    all : (async () => {
        const shows : (Show | ApiShow)[] = await jsonFetch("/api/v1/show/");
        const personPromise: Promise<Person>[]= [];
        const personCache : string[]= [];
        for(const show of shows){
            const organizer : string = show.organizer as string;
            if(organizer && !(organizer in personCache)){
                personCache.push(organizer);
                personPromise.push(PersonManager.get(organizer));
            }
            for(const judge of show.judges as string[]){
                if(judge && !(judge in personCache)){
                    personCache.push(judge);
                    personPromise.push(PersonManager.get(judge));
                }
            }
        }
        const people = await Promise.all(personPromise);
        for(const show of shows){
            if(show.organizer){
                show.organizer = people.find(p => p.id == show.organizer as string);
            }
            for(var i = 0; i < (show.judges?.length || 0); i++){
                const p = people.find(p => p.id == show.judges[i] as string);
                if(p){
                    show.judges[i] = p;
                }
            }
        }
        return shows as Show[];
    })
}