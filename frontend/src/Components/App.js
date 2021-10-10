import React from 'react';
import { Route,  BrowserRouter } from "react-router-dom";

import Routers from './js/Routers'
import {Header} from './js/navbar/Header';
import "./css/master.css";
import {urls, navbarList} from '../Site_code/urls' ;


function Test(){
  return (<b>lul</b>);
}

class App extends React.Component {
  constructor(props){
    super();
  }
  render(){
    return (
      <div>
          <BrowserRouter>
              <Header navbar = {navbarList}></Header>
              <Route path={urls.HOME} exact component={Test}></Route>
              <Route path={urls.CATS} component={Routers.CatRouter}></Route>
              <Route path={urls.MEMBERS} component={Routers.MemberRouter}></Route>
              <Route path={urls.CATTERIES} component={Routers.CatteryRouter}></Route>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
