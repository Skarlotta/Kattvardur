import React from 'react';
import { useEffect} from 'react';
import {Link} from 'react-router-dom';
import urls from '../../../../Site_code/urls';
import {EntrantOverview, NominationOverview} from '../../Models/Show/Judgement';
import {SortableTable, SortableHeading} from '../../misc/SortableTable';
import CatTree from './CatTree';
import '../../../css/show.css'; 


const CatRow = ({cat}) => <tr>
<td><Link to={urls.MAKECATPROFILE(cat.id)}>{cat.registry_number}</Link></td>
    <td><Link to={urls.MAKECATPROFILE(cat.id)}>{cat.name}</Link></td>
    <td>{cat.ems}</td>
    <td>{cat.birthdate}</td>
</tr>;

const CatTable = ({cats}) => {
    if(cats.length === 0){
        return <div><i>Engir kettir</i></div>
    } 
    return<table>
        <tbody>
            {cats.map(x => <CatRow key={x.id} cat={x}></CatRow>)}
        </tbody>
    </table>;
};

export const CatSiblings = ({cat, siblings, getSiblings}) => {        
    useEffect(() => {
        getSiblings();
    })
    if(!siblings){
        return <b>Augnablik...</b>;
    } else{
        siblings.sort((a,b) => new Date(a.birthdate) < new Date(b.birthdate));
        let litterMates = siblings.filter(x => 
            x.birthdate === cat.birthdate &&
            cat.dam === x.dam
        );

        let totalSiblings = siblings.filter(x => 
          x.birthdate !== cat.birthdate &&
          cat.dam === x.dam &&
          cat.sire === x.sire  
        );

        let maternalSiblings = siblings.filter(x => 
            x.dam === cat.dam && x.sire !== cat.sire    
        )
        let paternalSiblings = siblings.filter(x => 
            x.dam !== cat.dam && x.sire === cat.sire    
        )
        return <div>
            <b>Gotsystkin</b>
            <CatTable cats={litterMates}></CatTable>
            <b>Alsystkin</b>
            <CatTable cats={totalSiblings}></CatTable>            
            <b>Sammæðra eingöngu</b>
            <CatTable cats={maternalSiblings}></CatTable>            
            <b>Samfeðra eingöngu</b>
            <CatTable cats={paternalSiblings}></CatTable>
        </div>
    }
};

export const CatLitters = ({cat, litters, getLitters}) => {
    useEffect(() => {
        getLitters();
    })
    if(litters){
        let ret = [];
        ret.push(<div><i>{cat.name} hefur eignast {litters.length} got</i></div>)
        for(let litter of litters){
            let parent;
            if(litter.sire && litter.sire.id !== cat.id){
                parent = litter.sire;
            } else{
                parent = litter.dam;
            }
            ret.push(<b key={litter.id}>{litter.litter}  -  <Link to={urls.MAKECATPROFILE(parent.id)}>({parent.registry_number}) {parent.name}</Link></b>)
            ret.push(<CatTable key={litter.litter+"cats"} cats={litter.cats}></CatTable>);
        }
        return <div>{ret}</div>
    }
    return <b>Augnablik...</b>;
};

const CatCertificationTable = ({certifications}) => {
    let headers = ["", "Stig", "Titill", "Sýning", "Dags.", "Dómari"].map(x => <SortableHeading key={x}>{x}</SortableHeading>);

    let rows = certifications.map(x => {
        if(!x.judgement){
            x.judgement = {
                show:{
                    name:"",
                    date:""
                },
                judge:{
                    name:"",
                    country:""
                }
            }
        }
        return[
            x.cert.absRank,
            x.cert.certification,
            x.cert.title,
            x.judgement.show.name,
            x.judgement.show.date,
            x.judgement.judge.name + " ("+x.judgement.judge.country+")"
        ]})

    return <SortableTable invisibleColumns={[0]} className="checkeredTable entrantOverviewTable" headers={headers} rows = {rows}></SortableTable>
}

export const CatJudgements = ({cat, judgements, getJudgements}) => {
    useEffect(() => {
        getJudgements();
    });

    if(judgements){
        return <EntrantOverview judgements={judgements}></EntrantOverview>
    } else{
        return <b>Augnablik...</b>
    }
}

export const CatAwards = ({judgements, getJudgements}) => {
    useEffect(() => {
        getJudgements();
    });

    if(judgements){
        return <NominationOverview judgements={judgements}></NominationOverview>
    } else{
        return <b>Augnablik...</b>
    }
}

export const CatCerts = ({certifications, getCertifications}) => {
    useEffect(() => {
        getCertifications();
    });

    if(certifications){
        return <CatCertificationTable certifications={certifications}></CatCertificationTable>;
    } else{
        return <b>Augnablik...</b>
    }
}

export const CatFamilyTree = ({ancestors, getAncestors}) => {
    useEffect(() => {
        getAncestors();
    });

    if(ancestors){
        return <CatTree root={ancestors}></CatTree>
    } else{
        return <b>Augnablik...</b>
    }  
}