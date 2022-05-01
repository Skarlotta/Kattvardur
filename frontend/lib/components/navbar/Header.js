import React from 'react';
import styles from "../../styles/Headercomponents.module.css";
import Link from 'next/link';
import Dropdown from './Dropdown';

function NavBar({links}){
    return (<div>      
        <b>fsawf</b>  
        <Dropdown>
            <Link className ={styles.navbar_link} href="/kottur/">Kettir</Link>
        </Dropdown>
    </div>);
} 

function Brand(){
    return (
        <Link  href="/" className ={styles.brand}>
            <>
                <strong>KYNJAKETTIR</strong>
                <small>KATTARÆKTARFÉLAG ÍSLANDS</small>
            </>
        </Link>
    );
}

//Links = 
function Header(props){
    return (
        <div className="header">
            <b>aa</b>
            <Brand></Brand>
            <b>bb</b>
            <NavBar links={props.navbar}></NavBar>
        </div>
    );
}

export {NavBar, Brand, Header};