import React from 'react';
import { Component } from 'react';
import { GoogleLogin } from 'react-google-login';


class LoginForm extends Component{

    onFail(){

    }

    onSuccess(resp){
        console.log("Success!");
        console.log(resp);
    }

    render(){
        return <div>
            <GoogleLogin
            clientId = {process.env.KATTVARDUR_GOOGLE_CLIENT_ID}      
            buttonText="Innskráning með Google"
            onSuccess={this.onSuccess} 
            onFailure={this.onFail}>
            </GoogleLogin>
        </div>;
    }
}

export default LoginForm;