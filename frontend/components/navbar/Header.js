import React from 'react';
import styles from "../../styles/Headercomponents.module.css";
import Link from 'next/link';
import Dropdown from './Dropdown';

function NavBar({links}){
    return (<div>        
        <Dropdown>
            <Link className ={styles.navbar_link} href="/kottur/">Kettir</Link>
        </Dropdown>
    </div>);
} 

function Brand(){
    return (
        <a  href="/" className ={styles.brand}>
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