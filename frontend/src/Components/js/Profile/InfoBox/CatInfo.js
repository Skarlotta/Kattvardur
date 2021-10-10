import React from 'react';
import BaseInfo from './BaseInfo';
import {Link} from 'react-router-dom';

function CatInformation({cat, editField, saveCat, changeProfile}){
    if(!cat){
        return null;
    }
    
    let makeInfo = (key, title, value) => {
        return {key, title, value,
            onEdit:(e) =>{
                editField(key, e.target.value);
            },
            canBeEdited:false
        }
    }

    let gender, neuterDate;
    if(cat.neutered){
        gender = cat.gender === "Female" ? "Geld Læða" : "Geldur Fress";
        neuterDate = makeInfo("neuter_date", "Gelding", cat.neutered_date);
    } else{
        gender = cat.gender === "Female" ? "Ógeld Læða" : "Ógeldur Fress";
        neuterDate = null;
    }

    let dam, sire;
    dam = "Óþekkt";
    sire = "Óþekktur";

    if(cat.dam){
        if(cat.dam_obj){
            dam = <Link to={"/k/"+cat.dam_obj.id} onClick={() => changeProfile(cat.dam_obj.id)}>{cat.dam_obj.name}</Link>;
        } else{
            dam = "augnablik..."
        }
    }

    
    if(cat.sire){
        if(cat.sire_obj){
            sire = <Link to={"/k/"+cat.sire_obj.id} onClick={() => changeProfile(cat.sire_obj.id)}>{cat.sire_obj.name}</Link>;
        } else{
            sire = "augnablik..."
        }
    }

    
    let information = [
        makeInfo("ems", "Litur", cat.ems),
        makeInfo("gender", "Kyn", gender),
        makeInfo("microchip", "Örmerki", cat.microchip || "Ekkert á skrá"),
        makeInfo("birth", "Fæðing", cat.birthdate),
        makeInfo("registration", "Skráning", cat.registration_date),
        neuterDate,
        makeInfo("sire", "Faðir", sire),
        makeInfo("dam", "Móðir", dam),
    ]

    return <BaseInfo fields={information} title={cat.name}></BaseInfo>
}

export default CatInformation;