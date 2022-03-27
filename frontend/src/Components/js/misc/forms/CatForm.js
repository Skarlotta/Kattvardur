import React, {Component} from 'react';

const CatForm = ({changeCat, warnings, cat}) => <div>
        <h3>Upplýsingar kattar</h3>
        <div className="form-wrapper"> 
            <span>
            <b>Nafn kattar</b><i className="warning">{warnings.name}</i><br></br>
                <input value={cat.name} onChange={e => changeCat("name",e.target.value)}></input>
            </span>
            <span>
            <b>Kyn</b><br></br>
                <select value={cat.gender} onChange={e => changeCat("gender", e.target.value)}> 
                    <option value="male">Fress</option>
                    <option value="female">Læða</option>
                </select>
            </span>
            <span>
                <b>Fæðingadagur</b><i className="warning">{warnings.birthdate}</i><br></br>
                <input type="date" value={cat.birth_date} onChange={e => changeCat("birth_date",e.target.value)}></input>
            </span>
            <span>
                <b>Skráningarnúmer</b><br></br>
                <input value={cat.registry_digits} onChange={e => changeCat("registry_digits",e.target.value)}></input>
            </span>
            <span>
            <b>EMS</b><i className="warning">{warnings.ems}</i><br></br>
                <select onChange={e => changeCat("breed", e.target.value)} value={cat.breed}>
                    <option value="HCS">HCS</option>
                    <option value="HCL">HCL</option>
                </select>
                <input onChange={e => changeCat("color",e.target.value)} value={cat.color}></input>
            </span>
            <span>
            <b>Örmerki</b> <i className="warning">{warnings.microchip}</i><br></br>
                <input onChange={e => changeCat("microchip",e.target.value)} value={cat.microchip}></input>
            </span>
        </div>
    </div>;

    export default CatForm;