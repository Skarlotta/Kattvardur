import React from 'react';
import { Route,  BrowserRouter } from "react-router-dom";

import Routers from './js/Routers'
import {Header} from './js/navbar/Header';
import "./css/master.css";
import {urls, navbarList, unauthorizedList} from '../Site_code/urls' ;
import LoginForm from './js/pages/auth/LoginForm';


function Test({user}){
  return (<b>{user.name}</b>);
}

class App extends React.Component {
  constructor(props){
    super();
    this.state = {
      user : {
        name:"bob"
      },
    }
  }
  render(){
    var nav;
    if(!this.state.user.login){
      return <div>
        <Header user = {this.state.user} navbar = {[]}></Header>
        <b>Please Log In</b>
        <LoginForm></LoginForm>
      </div>
    } else{
      return (
        <div>
            <BrowserRouter>
                <Header user = {this.state.user} navbar = {navbarList}></Header>
                <Route path={urls.HOME} exact>
                  <Test user={this.state.user}></Test>
                </Route>
                <Route path={urls.CATS} component={Routers.CatRouter}></Route>
                <Route path={urls.MEMBERS} component={Routers.MemberRouter}></Route>
                <Route path={urls.CATTERIES} component={Routers.CatteryRouter}></Route>
            </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
