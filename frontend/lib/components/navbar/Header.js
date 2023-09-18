import React from 'react';
import styles from "../../styles/Headercomponents.module.css";
import Link from 'next/link';
import Dropdown from './Dropdown'

function NavBar(){
    return (<div className={styles.navbar}>     
    <Dropdown toggle="Tets">
    <Link href="/cat/">
        <a>
            Kettir
        </a>
    </Link>  
    </Dropdown>      
        <Link href="/cattery/">
            <a className ={styles.navbar_link}>
                Ræktanir
            </a>
        </Link>
        <Link href="/member/">
            <a className ={styles.navbar_link}>
                Félagar
            </a>
        </Link>
        <Link href="/show/">
            <a className ={styles.navbar_link}>
                Sýningar
            </a>
        </Link>
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