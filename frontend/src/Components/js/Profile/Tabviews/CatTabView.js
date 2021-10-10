import React from 'react';
import { Component , useEffect} from 'react';
import {Tabview, Tab} from '../../Profile/ProfileComponents/Tabview';
import {PersonRow} from '../../Models/Person/Person';
import {CatSiblings, CatLitters, CatJudgements, CatAwards, CatCerts, CatFamilyTree} from '../../Models/Cat/Cat';

function Other({id}){
    return <h2>{id}</h2>
}

const CurrentOwners = ({owners}) => {
    owners = owners.filter(x => x.current);
    let ownerList = owners.map(x => {
            return <PersonRow key={x.person.id} id={x.person.id}person={x.person}></PersonRow>
        }
    )
    return <table>
        <tbody>
            {ownerList}
        </tbody>
    </table>;
}

const OwnerHistory = ({owners}) => {
    let _owners = owners.sort((a,b) => new Date(a.date) < new Date(b.date));
    let ret = [];
    let lastDate = "";
    for(let owner of _owners){
        if(owner.date !== lastDate){
            ret.push(<tr key={"b"+owner.date}><td><b>{owner.date}</b></td></tr>);
        }
        ret.push(<PersonRow key={owner.person.id+"__"+owner.date} id={owner.person.id+"_"+owner.date} person={owner.person}></PersonRow>)
    }
    return <table>
        <tbody>
            {ret}
        </tbody>
    </table>
}

const OwnerList = ({owners, getOwners}) => {        
    useEffect(() => {
        getOwners();
    })
    if(!owners){
        return <b>Augnablik...</b>;
    } else{
        return <div>
            <b>Núverandi eigendur</b>
            <CurrentOwners owners={owners}></CurrentOwners>
            <b>Eigendasaga</b>
            <OwnerHistory owners={owners}></OwnerHistory>
        </div>
    }
}

class CatTabView extends Component{
    constructor(){
        super();
    }

    getTabs(){
        return [
            Tab("owners","Eigendur"),
            Tab("siblings","Systkin"),
            Tab("litters","Got"),
            Tab("judgements","Dómar"),
            Tab("points","Stig og Titlar"),
            Tab("awards","Tilnefningar & Verðlaun"),
            Tab("ancestors","Ættartré")
        ];
    }

    render(){
        return <Tabview defaultTab="ancestors" tabs={this.getTabs()}>
            <OwnerList owners={this.props.owners} getOwners={this.props.getOwners} id="owners"></OwnerList>
            <CatSiblings cat={this.props.cat} siblings={this.props.siblings} getSiblings={this.props.getSiblings} id="siblings"></CatSiblings>
            <CatLitters cat={this.props.cat} litters={this.props.litters} getLitters={this.props.getLitters} id="litters"></CatLitters>
            <CatJudgements cat={this.props.cat} getJudgements={this.props.getJudgements} judgements={this.props.judgements} id="judgements"></CatJudgements>
            <CatAwards  getJudgements={this.props.getJudgements} judgements={this.props.judgements} id="awards"></CatAwards>
            <CatCerts getCertifications={this.props.getCertifications} certifications={this.props.certifications} id="points"></CatCerts>
            <CatFamilyTree getAncestors={this.props.getAncestors} ancestors={this.props.ancestors} id="ancestors"></CatFamilyTree>
        </Tabview>
    }
}

export default CatTabView;