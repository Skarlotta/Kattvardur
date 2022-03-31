import React, {useState} from 'react';
import {SortableTable, SortableHeading} from '../../misc/SortableTable';
import '../../../css/show.css';


const NominationJudgementSplitter = (judgements) => {
    let nominations = [];
    let specialAwards = [];
    for(let judgement of judgements){
        for(let nomination of judgement.nominations){
            let won;
            won = judgement.awards.indexOf(nomination) >= 0;
            nominations.push([
                judgement.show.name,
                judgement.show.date,
                nomination,
                won ? <b>Sigur</b> : <i>Tilnefning</i>,
                judgement.judge.name
            ])
        }
    }



    return {nominations, specialAwards}
}

const NominationOverview = ({judgements}) =>{
    judgements = judgements.filter(x => x.awards.length > 0 || x.nominations.length > 0);
    let headings = ["Sýning","Dags.","Flokkur","Niðurstaða", "Dómari"].map(x => 
        <SortableHeading key={x}>{x}</SortableHeading>    
    )
    
    let rows = NominationJudgementSplitter(judgements);


    return <SortableTable className="checkeredTable entrantOverviewTable"
        headers={headings}
        rows={rows.nominations}
    >
    </SortableTable>
}

const judgementString = (judgement) => {
    if(judgement.judgement){
        return judgement.judgement;
    } else{
        if(judgement.was_absent){
            return "ABS";
        } else{
            return "N/A";
        }
    }
}

const EntrantRow = (props) => {
    let judgement = EntrantRowDataFactory(props.judgement);
    let tdMap = judgement.map((col, ind) => <td key={ind}>{col}</td>)
    return <tr>
        {tdMap}
    </tr>
};

const EntrantRowDataFactory = (judgement) => {
    return [
        judgement.show.name, 
        judgement.show.date,
        judgement.catalog_number,
        judgementString(judgement),
        judgement.certification || "",
        judgement.nominations.length,
        judgement.awards.length,
        judgement.judge.name + " ("+judgement.judge.country+")"
    ]
}



const EntrantOverview = ({judgements}) => {

    let headings = ["Sýning","Dags.","Sýninganúmer","Dómur","Stig","Tilnefningar","Verðlaun","Dómari"].map(x => 
        <SortableHeading key={x}>{x}</SortableHeading>    
    )
    let entries = judgements.map(x => EntrantRowDataFactory(x));


    return <SortableTable className="checkeredTable entrantOverviewTable"
        headers={headings}
        rows={entries}
    >
    </SortableTable>
}

export {EntrantRow, EntrantOverview, NominationOverview};