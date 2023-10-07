import { Person,ApiShow, Show, ShowOverview, Judge} from '../../lib/types';
import { jsonFetch } from '../../fetcher';
import { PersonManager } from './Person';

export const ShowManager = {    
    get : async (id : string) : Promise<Show | undefined>=> {
        const show : ApiShow = await jsonFetch("/api/v1/show/"+id+"/");
        if(show){
            return (await ShowManager.processApiShows([show]))[0];
        } else {
            return undefined;
        }
    },
    all : (async () => {
        const shows : ApiShow[] = await jsonFetch("/api/v1/show/");
        return await ShowManager.processApiShows(shows);
    }),

    overview : (async(id : string) => {
        const overview : ShowOverview = await jsonFetch(`/api/v1/show/${id}/overview/`);
        return overview;
    }),

    judges : async (id : string) : Promise<Judge[] | undefined>=> {
        const judges : Judge[] = await jsonFetch("/api/v1/show/"+id+"/judges/");
        console.log("judge", judges);
        if(judges){
            return judges;
        } else {
            return undefined;
        }
    },
    processApiShows: async (shows : ApiShow[]) : Promise<Show[]> => {
        const processedShows : Show[] = [];
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
            const newShow : Show = {
                ...show,
                organizer : undefined,
                judges : [],
            }
            if(show.organizer){
                newShow.organizer = people.find(p => p.id == show.organizer as string);
            }
            for(var i = 0; i < (show.judges?.length || 0); i++){
                const p = people.find(p => p.id == show.judges[i] as string);
                if(p){
                    newShow.judges[i] = p;
                }
            }
            processedShows.push(newShow);
        }

        return processedShows;
    }
}