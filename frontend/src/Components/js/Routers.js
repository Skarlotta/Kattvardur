import React from 'react';
import CatSearch from './pages/cat/CatSearch';
import MemberSearch from './pages/member/MemberSearch';

import CatterySearch from './pages/cattery/CatterySearch';
import CatProfile from './pages/cat/CatProfile';
import HousecatRegistration from './pages/cat/HousecatRegistration';

import {  Route, Switch } from "react-router-dom";
import urls from '../../Site_code/urls';


function CatRouter(props){
    return(
            <div>           
                <Switch>
                    <Route path={urls.CATSEARCH} exact component={CatSearch}></Route>
                    <Route path={urls.CATNEWCAT} exact component={HousecatRegistration}></Route>
                    <Route path={urls.CATPROFILE} exact component={CatProfile}></Route>   
                </Switch>   
            </div>
    );
};

function MemberRouter(props){
    return(
            <div>       
                <Switch>         
                    <Route path={urls.MEMBERSEARCH} exact component={MemberSearch}></Route>
                    <Route path={urls.MEMBERPROFILE} ></Route>    
                </Switch>       
            </div>
    );
};

function CatteryRouter(props){
    return(
            <div>         
                <Switch>       
                    <Route path={urls.CATTERYSEARCH} exact component={CatterySearch}></Route>
                    <Route path={urls.CATTERYPROFILE}></Route>    
                </Switch>       
            </div>
    );
};

let exp = {CatRouter, MemberRouter, CatteryRouter};

export default exp;