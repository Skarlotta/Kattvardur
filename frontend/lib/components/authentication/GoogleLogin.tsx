import React from 'react';
import { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { CSRFTokenString } from '../forms/src/blocks/GenericForm/util';

/*
    A standard login form allowing users to log in via Google Auth.
    Todo - standard login for those that for whatever reason prefer that. 
*/

type P = {
    clientId? : string,
    onLogin: (user:any) => void
}

type PS = {
    error:string,
    u : string,
    p : string,
}

class LoginForm extends Component<P, PS>{
    constructor(props: P){
        super(props);
        this.state = {
            error : "",
            u : "",
            p : "",
        }
        this.onGoogleFail = this.onGoogleFail.bind(this);
        this.onGoogleSuccess = this.onGoogleSuccess.bind(this);
        this.GoogleValidate = this.GoogleValidate.bind(this);
        this.login = this.login.bind(this);
        this.handleLoginResp = this.handleLoginResp.bind(this);
    }

    login(e : any){
        e.preventDefault();
        this.setState({
            error : ""
        });
        const {u, p} = this.state;
        if(!u || !p){
            return this.setState({error : "Vinsamlegast útfyllið netfang og lykilorð"});
        }
        fetch("/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username : u,
                password : p

            }),
            headers:{
                'X-CSRFToken':CSRFTokenString() || '',
                'content-type': 'application/json',
            }
        }).then(this.handleLoginResp)
    }

    handleLoginResp(resp : Response){
        console.log("Woo!");
        if(resp.status == 200){
            resp.json().then(dat => {
                this.props.onLogin(dat.user);
            })
        } else if(resp.status == 401 || resp.status == 403){
            this.setState({
                error : "Enginn aðgangur fannst fyrir gefið netfang og lykilorð"
            });
        } else{
            this.setState({
                error : "Óvænt villa, reynið aftur síðar"
            })
        }
    }

    //void onGoogleFail - Callback for when Google Oauth fails. Displays an error message
    onGoogleFail(){
        this.setState({
            error: "Google auðkenning mistókst"
        });
    }

    //void onGoogleSuccess - Callback for when Google Oauth succeeds. Filters out the tokenId and Email and passes it on to validation
    //Dict resp => the response returned by Google 
    onGoogleSuccess(resp : any){
        var tokenId = resp.tokenId;
        var data = {
            email : resp.profileObj.email
        }
        this.GoogleValidate(data, tokenId);
    }
    
    //void GoogleValidate - takes the tokenId and user data returned by Google and validates it against the server. 
    //dict data => {email}, string tokenid => the oauth tokenId to be validated.
    GoogleValidate(data : any, tokenId : string){
        const headers = {
            Authorization: tokenId,
            'Content-Type': 'application/json'
        };
        
        fetch('/api/v1/auth/oauth/', {
            method:"POST",
            body:JSON.stringify(data), 
            headers
        }).then(this.handleLoginResp);
    }

    render(){
        const {clientId} = this.props;
        var error = null;
        if (this.state.error) {
            error = <div>
                <b>
                    {this.state.error}
                </b>
            </div>
        }

        return <>
            {error}
            <form onSubmit={this.login}>
                <input placeholder='Netfang' value={this.state.u} onChange={e => this.setState({u : e.target.value})}/><br/>
                <input type='password' placeholder='Lykilorð' value={this.state.p} onChange={e => this.setState({p : e.target.value})}/><br/>
                <button>Innskrá</button>
            </form><br></br>
            {clientId  && <GoogleLogin
                clientId = {clientId}      
                buttonText="Innskráning með Google"
                onSuccess={this.onGoogleSuccess} 
                onFailure={this.onGoogleFail}/>
            }
        </>;
    }
}

export default LoginForm;