import { Person, ApiShow, Show,Entry, Judgement} from '../types';
import { jsonFetch } from '../../fetcher';
import { PersonManager } from './Person';

export const JudgementManager = {    
    get : async (show_id : string, catalog_nr : number) : Promise<Judgement | undefined>=> {
        const judgement : Judgement = await jsonFetch("/api/v1/show/"+show_id+"/judgement/"+catalog_nr+"/");
        return judgement;
    },

    patch : async (show_id : string, catalog_nr : number, judgement : Judgement) : Promise<Judgement | undefined>=> {
        const response : Judgement = await jsonFetch("/api/v1/show/"+show_id+"/judgement/"+catalog_nr+"/", {
            method: "PATCH",
            body : JSON.stringify(JudgementManager.sanitize(judgement)),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        });
        return response;
    },

    sanitize : (data : Judgement) => {
        return {
            abs: data.abs,
            biv: data.biv,
            //catcertification: data.catcertification,
            comment: data.comment,
            //judge_id: data.judge_id,
            nominations: data.nominations,
            judgement: data.judgement,
            judge_id : data.judge_id
        }
    }
}