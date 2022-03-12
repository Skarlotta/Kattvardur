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
        this.onGoogleFail = this.onGoogleFail.bind(this);
        this.onGoogleSuccess = this.onGoogleSuccess.bind(this);
        this.GoogleValidate = this.GoogleValidate.bind(this);
    }

    //void onGoogleFail - Callback for when Google Oauth fails. Displays an error message
    onGoogleFail(){

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
        });
    }

    render(){
        return <div>
            <GoogleLogin
            clientId = {process.env.KATTVARDUR_GOOGLE_CLIENT_ID}      
            buttonText="Innskráning með Google"
            onSuccess={this.onGoogleSuccess} 
            onFailure={this.onGoogleFail}>
            </GoogleLogin>
        </div>;
    }
}

export default LoginForm;