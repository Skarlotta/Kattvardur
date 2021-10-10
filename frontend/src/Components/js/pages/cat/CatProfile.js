import React from 'react';
import { Component } from 'react';
import { withRouter } from "react-router";
import ProfileImage from '../../Profile/ProfileComponents/ProfileImage';
import ImageEditor from '../../Profile/ProfileComponents/ImageEditor';
import apiFetch from '../../../../Site_code/api';
import CatInformation from '../../Profile/InfoBox/CatInfo';
import CatTabView from '../../Profile/Tabviews/CatTabView';
import '../../../css/profile.css';

const ChangeImageView = (props) => {
    if(props.active){
        return <ImageEditor></ImageEditor> 
    } else{
        return null;
    }
}

class CatProfile extends Component{
    constructor(){
        super();
        this.state = {
            owners : null,
            siblings : null,
            litters : null,
            judgements : null,
            cat : null,
            ancestors: null,
            certifications: null,
            lastId: null,
            fullScreenBlock: false,
        }

        this.fetchInformation = this.fetchInformation.bind(this);
        this.getOwners = this.getOwners.bind(this);
        this.getData = this.getData.bind(this);

    }

    fetchInformation(id){
        this.setState({
            owners:null,
            siblings:null,
            litters:null,
            judgements:null,
            ancestors: null,
            certifications: null,
            lastId:id,
            cat:null
        })
        apiFetch("kettir/"+id).then(data => {
            this.setState({
                cat:data.results
            });
            
            if(data.results.sire){
                apiFetch("kettir/"+data.results.sire).then(data => {
                    let cat = this.state.cat;
                    cat.sire_obj = data.results;
                    this.setState({cat});
                })
            }
            if(data.results.dam){
                apiFetch("kettir/"+data.results.dam).then(data => {
                    let cat = this.state.cat;
                    cat.dam_obj = data.results;
                    this.setState({cat});
                })
            }
        })
    }

    componentDidMount(){
        this.setState({lastId:this.props.match.params.id}, () => {
            this.fetchInformation(this.state.lastId);
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.match.params.id !== this.state.lastId){
            this.fetchInformation(this.props.match.params.id);
        }
    }


    getOwners(){
        if(this.state.lastId === null || this.state.owners !== null){
            return;
        }
        this.setState({owners:undefined});
        apiFetch(`kettir/${this.state.lastId}/eigendur`).then(data =>{
            let ids = data.results.map(x => x.person).join(",");
            let ownerHistory = data.results;
            apiFetch("folk?id="+ids).then(data => {
                for(let entry of ownerHistory){
                    entry.person = data.results.find(x => x.id === entry.person);
                }
                console.log(ownerHistory);
                this.setState({
                    owners:ownerHistory
                })
            })
        })
    }

    getData(urlEnding, dataName){
        if(this.state.lastId === null || this.state[dataName] !== null){
            return;
        }
        apiFetch(`kettir/${this.state.lastId}/${urlEnding}`).then(data => {
            this.setState({[dataName]:data.results});
        }) 
    }

    render(){
        return <div>
            <ChangeImageView active={this.state.fullScreenBlock}></ChangeImageView>
            <div className = "profile-wrapper">
                <div className="left-profile">
                    <ProfileImage onClick={(e) => this.setState({fullScreenBlock:true})} image={this.state.cat ? this.state.cat.image : null}></ProfileImage>
                </div>
                <div className="right-profile">
                   <CatInformation changeProfile={this.fetchInformation} cat={this.state.cat}></CatInformation>
                </div>
                <div className="bottom-profile">
                    <CatTabView 
                        cat={this.state.cat} 
                        owners={this.state.owners}
                        siblings={this.state.siblings}
                        judgements={this.state.judgements}
                        litters={this.state.litters}
                        certifications={this.state.certifications}
                        ancestors={this.state.ancestors}

                        getOwners={this.getOwners}
                        getSiblings={() => this.getData("systkin", "siblings")}
                        getJudgements={() => this.getData("domar","judgements")}
                        getLitters={() => this.getData("got","litters")}
                        getCertifications={() => this.getData("stig","certifications")}
                        getAncestors={() => this.getData("forfedur","ancestors")}
                    >
                    </CatTabView>
                </div>
            </div>
        </div>
    }
}

export default withRouter(CatProfile);