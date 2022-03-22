import React from 'react';
import { Route,  BrowserRouter } from "react-router-dom";

import Routers from './js/Routers'
import {Header} from './js/navbar/Header';
import "./css/master.css";
import {urls, navbarList, unauthorizedList} from '../Site_code/urls' ;
import LoginForm from './js/pages/auth/LoginForm';
import Cookies from 'js-cookie';
import Home from './js/pages/Home';


class App extends React.Component {
  constructor(props){
    super();
    let user = Cookies.get('user');
    if(user){
      user = JSON.parse(user);
    } else{
      user = {};
    }
    this.state = {
      user: user
    };
    this.setUser = this.setUser.bind(this);
  }

  setUser(user, tokenId){
    user.login = true;
    user.tokenId = tokenId;
    Cookies.set('user', JSON.stringify(user));

    this.setState({
      user : user
    });
  }

  render(){
    var nav;
    if(!this.state.user.login){
      return <div>                 
        <Header user = {this.state.user} navbar = {[]}></Header>
        <b>Please Log In</b>
        <LoginForm onLogin={this.setUser}></LoginForm>
      </div>
    } else{
      return (
        <div>
            <BrowserRouter>
                <Header user = {this.state.user} navbar = {navbarList}></Header>
                <Route path={urls.HOME} exact>
                  <Home user={this.state.user}></Home>
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
