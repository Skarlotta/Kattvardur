import React from 'react';
import { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

/*
    A standard login form allowing users to log in via Google Auth.
    Todo - standard login for those that for whatever reason prefer that. 
*/
class LoginForm extends Component{
    constructor(props){
        super();
        this.state = {
            error : null
        }
        this.onGoogleFail = this.onGoogleFail.bind(this);
        this.onGoogleSuccess = this.onGoogleSuccess.bind(this);
        this.GoogleValidate = this.GoogleValidate.bind(this);
    }

    //void onGoogleFail - Callback for when Google Oauth fails. Displays an error message
    onGoogleFail(){
        this.setState({
            error: "Google auðkenning mistókst"
        });
    }

    //void onGoogleSuccess - Callback for when Google Oauth succeeds. Filters out the tokenId and Email and passes it on to validation
    //Dict resp => the response returned by Google 
    onGoogleSuccess(resp){
        var tokenId = resp.tokenId;
        var data = {
            email : resp.profileObj.email
        }
        this.GoogleValidate(data, tokenId);
    }

    //void GoogleValidate - takes the tokenId and user data returned by Google and validates it against the server. 
    //dict data => {email}, string tokenid => the oauth tokenId to be validated.
    GoogleValidate(data, tokenId){
        const headers = {
            Authorization: tokenId,
            'Content-Type': 'application/json'
        };
        
        fetch('/api/v1/auth/oauth/', {
            method:"POST",
            body:JSON.stringify(data), 
            headers
        }).then(resp => {
            console.log(resp);
            if(resp.status == 200){
                console.log("200");
                resp.json().then(dat => {
                    this.props.onLogin(dat.user);
                })
            } else if(resp.status == 401 || resp.status == 403){
                console.log("401");
                this.setState({
                    error : "Enginn aðgangur fannst fyrir gefið netfang"
                });
            } else{
                console.log("err");
                this.setState({
                    error : "Óvænt villa, reynið aftur síðar"
                })
            }
        });
    }

    render(){
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
            <GoogleLogin
            clientId = {process.env.KATTVARDUR_GOOGLE_CLIENT_ID}      
            buttonText="Innskráning með Google"
            onSuccess={this.onGoogleSuccess} 
            onFailure={this.onGoogleFail}>
            </GoogleLogin>
        </>;
    }
}

export default LoginForm;