import React, {Component} from 'react';
import {MultistepForm, Progressbar} from '../../misc/MultistepForm';
import "../../../css/forms.css";
import {CatForm} from '../../misc/forms/Forms';
import Person from '../../Models/Person/Person';
import { isValidIsSSN } from '../../../../Site_code/util';
//<DatePicker dateFormat="dd/MM/yyyy" selected={cat.birthdate} onChange={date => changeCat("birthdate", date)}></DatePicker>


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
            page : 1
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
        if(!isValidIsSSN(this.state.kt)){
            console.log("Invalid");
            return;
        }
        fetch("/api/v1/person/?ssn="+encodeURI(this.state.kt)).then(data => data.json()).then(
            data => {
                let owners = this.state.owners;
                let newOwner = new Person();
                if(data.length === 1){
                    if(owners.find(x=>x.id === data.results[0].id)){
                        return;
                    }
                    newOwner.obj = data[0];
                }
                owners.push(newOwner);
                this.setState({owners})
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
                    if(this.state.owners.find(x => x.obj.name === "")){
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
        owners[i].setField(f, v);
        this.setState({owners});
    }

    validateEms(){
        fetch("/api/v1/ems/e?search="+encodeURI(this.state.cat.breed+" "+this.state.cat.color)).then(data => data.json()).then(data => {
            this.setState({validEms: data.success});
        })
    }

    render(){
        let owners = this.state.owners.map((person,i) => {
            return <div className="outlined">{person.form((key, val) => this.changeOwner(i, key, val), this.state.warnings, [], ["ssn"])}</div>;
        })
        return <div>
            <Progressbar currentStep={this.state.page} totalSteps={2}></Progressbar>
            <h2 style={{paddingLeft:"10%", paddingTop:"2em"}}>Skrá húskött</h2>
            <MultistepForm 
            page={this.state.page} 
            lastPage={this.lastPage}
            nextPage={this.nextPage}
            onSave={this.onSave}
            >
                <CatForm changeCat={this.changeCat} warnings = {this.state.warnings.cat} cat={this.state.cat}></CatForm>
                <div>        
                    <h3>Eigendur</h3>
                        <div className="form-wrapper">
                            <span>
                                <b>Sláðu inn kennitölu eiganda</b><br/>
                                <input value={this.state.kt} onChange={e => this.setState({kt:e.target.value})}></input><br/>
                                <span onClick={this.getOwner} className="form-button inline">Leita</span>
                            </span>
                        </div>
                    <div>
                        {owners}
                    </div>
                </div>
                <Confirm validEms={this.state.validEms} cat={this.state.cat} owners={this.state.owners}></Confirm>
            </MultistepForm>
        </div>
    }
}

export default HousecatRegistration;