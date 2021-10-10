import React from 'react';
import "../../css/HeaderComponents.css";
import { Link } from "react-router-dom";
import { urls } from '../../../Site_code/urls';
import Dropdown from './Dropdown';

function NavBar({links}){
    let categories = links.map(cat => {
        let links = cat.links.map(link => (
            <Link className ="navbar-link" key={link.path} to={link.path}>{link.name}</Link>
        ));
        return (
        <Dropdown toggle={cat.name} key={cat.name}>
            {links}
        </Dropdown>
    );
    });
    return (<div>{categories}</div>);
} 

function Brand(){
    return (
        <a  href={urls.HOME} id="brand">
            <strong>KYNJAKETTIR</strong>
            <small>KATTARÆKTARFÉLAG ÍSLANDS</small>
        </a>
    );
}

//Links = 
function Header(props){
    return (
        <div className="header">
            <Brand></Brand>
            <NavBar links={props.navbar}></NavBar>
        </div>
    );
}

export {NavBar, Brand, Header};