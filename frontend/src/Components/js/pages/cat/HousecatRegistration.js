import React, {Component} from 'react';
import {MultistepForm, Progressbar} from '../../misc/MultistepForm';
import CountrySelector from '../../misc/CountrySelector';
import "../../../css/forms.css";
//<DatePicker dateFormat="dd/MM/yyyy" selected={cat.birthdate} onChange={date => changeCat("birthdate", date)}></DatePicker>

const BasicInformation = ({changeCat, warnings, cat}) => <div>
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

const OwnerInformation = ({kt, changeKt, getOwner, owners, changeOwner, warning}) => {
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
        <h3>Eigendur</h3>
        <div className="form-wrapper">
            <span>
                <i className="warning">{warning}</i><br/>
                <b>Sláðu inn kennitölu eiganda</b><br/>
                <input value={kt} onChange={changeKt}></input><br/>
                <span onClick={getOwner} className="form-button inline">Leita</span>
            </span>
        </div>
        <div>
            {ownerTable}
        </div>
    </div>
}

const Confirm = ({cat, owners, validEms}) =>{
    var val = null;
    if(!validEms){
        val = <i className="red warning">Þetta er ekki þekkt EMS gildi. Það verður nýskráð þegar þú staðfestir</i>;
    }
    return <div>
        <h3>Staðfesta</h3>
        <p>Vinsamlegast staðfestið að eftirfarandi upplýsingar séu réttar</p>
        
        <div>
            Nafn kattar <i>{cat.name} </i><br></br>
            Kyn <i>{cat.gender === "male" ? "Fress":"Læða"}</i><br></br>
            Fæðingardagur <i>{cat.birth_date.toDateString()}</i><br></br>
            Skráninganúmer <i>{cat.registry_digits}</i><br></br>
            Örmerki <i>{cat.microchip}</i><br></br>
            EMS <i>{cat.breed} {cat.color}</i> {val}<br></br>
        </div>
<br></br>
        <b>Eigendur:</b>
        <table>
            <tr>
                <th>Nafn</th>
                <th>Kennitala</th>
                <th>Heimilisfang</th>
                <th>Netfang</th>
                <th>Símanúmer</th>
            </tr>
            {owners.map(x => <tr>
                <td>{x.name}</td>
                <td>{x.ssn}</td>
                <td>{x.address} {x.postcode} {x.city} {x.country}</td>
                <td>{x.email}</td>
                <td>{x.phone}</td>
            </tr>)}
        </table>
    </div>
}

class HousecatRegistration extends Component{
    constructor(p){
        super();
        this.state = {
            validEms: false,
            cat : {
                name:"",
                breed:"HCL",
                color:"",
                gender:"male",
                microchip:"",
                neutered:true,
                birth_date:new Date(),
                registration_date: new Date(),
                registry_digits: "????"
            },
            warnings:{
                cat: {
                    name:"",
                    color:"",
                    birthdate:"",
                }
            },
            kt:"",
            owners : [

            ],
            page : 2
        }
        this.changeCat = this.changeCat.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.getOwner = this.getOwner.bind(this);
        this.validateEms = this.validateEms.bind(this);
        this.changeOwner = this.changeOwner.bind(this);
        this.onSave = this.onSave.bind(this);
        
    }

    componentDidMount(){
        fetch("/api/v1/cat/regnr").then(data => data.json()).then(data =>{
            let cat = this.state.cat;
            cat.registry_digits = data.reg_nr;
            this.setState({cat});
        })
    }

    onSave(){
        let cat = this.state.cat;
        cat.ems = cat.breed + " " + cat.color;
        cat.birth_date = cat.birth_date.toISOString().slice(0,10);
        cat.registry_number = "ÍS KKÍ HÚS " + cat.registry_digits;
        fetch("/api/v1/cat", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify(cat),
        }).then(data => data.json()).then(data => {
            if(data.success){
                alert("woo!"); 
            }
        })
    }

    getOwner(){
        if(this.state.kt.length < 10){
            return;
        }
        let d = JSON.stringify({
            filter:{
                ssn: this.state.kt
            }
        })
        fetch("/api/v1/folk?data="+d).then(data => data.json()).then(
            data => {
                let owners = this.state.owners;
                let newOwner = {
                    id:null,
                    name:"",
                    ssn:this.state.kt,
                    address:"",
                    postcode:"",
                    city:"",
                    country:"ISL",
                    email:"",
                    phone:""
                }
                if(data.results.length === 1){
                    if(owners.find(x=>x.id === data.results[0].id)){
                        return;
                    }
                    newOwner = data.results[0];
                }
                owners.push(newOwner);
                this.setState({ owners})
            }
        )
    }

    changeCat(field, value){
        var cat = this.state.cat;
        cat[field] = value;
        this.setState({cat});
    }

    nextPage(){
        let cat = this.state.cat;
        let warnings = this.state.warnings;
        let valid = true;

        switch(this.state.page){
            case 0: {
                this.validateEms();
                if(cat.name.length <= 1){
                    valid = false;
                    warnings.cat.name = "Nafn verður að vera tveir stafir"
                } else{
                    warnings.cat.name = "";
                }
                if(cat.color.length === 0){
                    valid = false;
                    warnings.cat.ems = "EMS verður að vera útfyllt"
                } else{
                    warnings.cat.ems = "";
                }
                
                if(cat.microchip === ""){
                    valid = false;
                    warnings.cat.microchip = "Kettir þurfa að vera örmerktir"
                } else{
                    warnings.cat.microchip = "";
                }
                if(cat.birthdate > new Date()){
                    valid = false;
                    warnings.cat.birthdate = "Fæðing má ekki vera í framtíðinni"
                } else{
                    warnings.cat.birthdate = "";
                }
                break;
            }
            case 1:{
                if(this.state.owners.length === 0){
                    valid = false;
                    warnings.owners = "Í það minnsta einn eigandi verður að vera skráður";
                } else{
                    if(this.state.owners.find(x => x.name === "")){
                        valid = false;
                        warnings.owners = "Allir eigendur þurfa nafn";
                    }
                }
                break;
            }
        }
        if(valid){
            this.setState({warnings, page: this.state.page + 1});
        } else{
            this.setState({warnings})
        }
    }

    lastPage(){
        this.setState({page: this.state.page - 1});
    }

    changeOwner(i, f, v){
        let owners = this.state.owners;
        owners[i][f] = v;
        this.setState({owners});
    }

    validateEms(){
        fetch("/api/v1/ems/"+this.state.cat.breed+"/"+this.state.cat.color.split(" ").join("_")).then(data => data.json()).then(data => {
            this.setState({validEms: data.success});
        })
    }

    render(){
        return <div>
            <Progressbar currentStep={this.state.page} totalSteps={2}></Progressbar>
            <h2 style={{paddingLeft:"10%", paddingTop:"2em"}}>Skrá húskött</h2>
            <MultistepForm 
            page={this.state.page} 
            lastPage={this.lastPage}
            nextPage={this.nextPage}
            onSave={this.onSave}
            >
                <BasicInformation changeCat={this.changeCat} warnings = {this.state.warnings.cat} cat={this.state.cat}></BasicInformation>
                <OwnerInformation warning={this.state.warnings.owners} changeOwner={this.changeOwner} changeKt={e => this.setState({kt:e.target.value})} kt={this.state.kt} getOwner={this.getOwner} owners={this.state.owners}>

                </OwnerInformation>
                <Confirm validEms={this.state.validEms} cat={this.state.cat} owners={this.state.owners}></Confirm>
            </MultistepForm>
        </div>
    }
}

export default HousecatRegistration;