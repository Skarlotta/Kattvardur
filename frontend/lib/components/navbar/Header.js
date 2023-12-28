import React from 'react';
import styles from "../../styles/Headercomponents.module.css";
import Link from 'next/link';
import Dropdown from './Dropdown'

function NavBar(){
    return (<div className={styles.navbar}>        
    </div>);
} 

function Brand(){
    return (
        <Link  href="/">
            <a>
                <div className={styles.brand}>
                    <strong>KYNJAKETTIR</strong>
                    <small>KATTARÆKTARFÉLAG ÍSLANDS</small>
                </div>
            </a>
        </Link>
    );
}

//Links = 
function Header(props){
    return (
        <div className={styles.header}>
            <Brand></Brand>
            <NavBar links={props.navbar}></NavBar>
        </div>
    );
}

export {NavBar, Brand, Header};