import React, {Component} from 'react';
import CountrySelector from '../CountrySelector';

const PeopleForm = ({owners, changeOwner, warning}) => {
    let ownerTable = owners.map((x,i) => {
        return <div key={x.ssn} className="form-wrapper outlined">
            <h3 style={{width:"100%"}}>Eigandi {i+1}</h3><br/>
            <span>
                <b>Nafn</b><br></br>
                <input onChange={(e) => changeOwner(i, "name", e.target.value)} value={x.name}></input>
            </span>            
            <span>
                <b>Kennitala</b><br></br>
            <input disabled={true} value={x.ssn}></input>
            </span>
            <span>
                <b>Heimilisfang</b><br></br>
            <input onChange={(e) => changeOwner(i, "address", e.target.value)} value={x.address}></input>
                </span>            
            <span>
                <b>Póstfang</b>    <br></br>            
            <input onChange={(e) => changeOwner(i, "postcode", e.target.value)} value={x.postcode}></input>
            </span>
            <span>
                <b>Borg</b><br></br>
            <input onChange={(e) => changeOwner(i, "city", e.target.value)} value={x.city}></input>
                </span>            
            <span>
                <b>Land</b><br></br>
                <CountrySelector onChange={(e) => changeOwner(i, "country", e.target.value)} className="big" value={x.country}></CountrySelector>
            </span>
            <span>
                <b>Netfang</b><br></br>
            <input onChange={(e) => changeOwner(i, "email", e.target.value)} value={x.email}></input>
                </span>            
            <span>
                <b>Símanúmer</b><br></br>
            <input onChange={(e) => changeOwner(i, "phone", e.target.value)} value={x.phone||""}></input>
            </span>
        </div>
    });
    return <div>
            {ownerTable}
    </div>;
}

export default PeopleForm;