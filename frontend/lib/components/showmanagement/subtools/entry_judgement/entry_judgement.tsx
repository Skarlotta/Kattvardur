import React, { useEffect, useState } from "react";
import { JudgementManager } from "../../../../models/Judgement";
import { Judge, Judgement, Show } from "../../../../types";

export const EntryJudgement = ({show, judges}:{show:Show, judges: Judge[]}) => {
    const [catalog_nr, setCatalogNr] = useState<number>(0);
    const [judgement, setJudgement] = useState<Judgement>();

    const handleSubmit = (event : any) => {
        event.preventDefault();
        const catalog_nr = event.target.catalog_nr.value;

        if(catalog_nr && parseInt(catalog_nr)){
            setCatalogNr(catalog_nr);
            JudgementManager.get(show.id, catalog_nr).then(judgement => setJudgement(judgement));
        }
    }

    const changeField = (field : any, value: any) => {
        if(!judgement){
            return;
        }
        const j = {
            ...judgement,
            [field] : value,
        }
        setJudgement(j);
    }

    const submit = (event : any) => {
        event.preventDefault();
        if(judgement){
            JudgementManager.patch(show.id, catalog_nr, judgement);
        }
    }

    return <div>
        <div>
            <form onSubmit={handleSubmit}>
                <input name="catalog_nr"></input>
                <button>Sækja</button>
            </form>
            <div>
                {judgement ? <JudgementForm judges={judges} judgement={judgement} setField={changeField} onSubmit={submit}/> : <i>Sláðu inn sýninganúmer</i>}
            </div>
        </div>
    </div>
}

interface JudgementFormP {
    judgement : Judgement,
    setField : (field : any, value : any) => void,
    onSubmit : (e:any) => any,
    judges : Judge[],
}

const JudgementForm = ({judgement, judges, setField, onSubmit} : JudgementFormP) => {
    return <form onSubmit={onSubmit}>
        <label>EMS</label>
        <input readOnly value={judgement.ems}/>

        <label>Dómari</label>
        <select onChange={e => setField("judge_id", e.target.value)} value={judges?.find(judge => judge.id == judgement.judge_id)?.id || "null"}>
            <option value={"null"}>Veldu Dómara</option>
            {judges.map(judge => <option key={judge.id} value={judge.id}>{judge.name}</option>)}
        </select>

        <label>Dómur</label>
        <input  onChange={e => setField("judgement", e.target.value)} value={judgement.judgement}/>

        <label>Abs</label>
        <input type="checkbox" onChange={e => setField("abs", e.target.checked)} checked={judgement.abs}/>

        <label>BIV</label>
        <input type="checkbox" onChange={e => setField("biv", e.target.checked)} checked={judgement.biv}/>
        
        <label>Athugasemd</label>
        <input type="textarea" onChange={e => setField("comment", e.target.value)} value={judgement.comment}/>

        <button>Vista</button>
    </form>
}