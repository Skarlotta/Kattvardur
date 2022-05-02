import React from 'react';
import styles from "../../styles/Headercomponents.module.css";
import Link from 'next/link';

function NavBar(){
    return (<div className={styles.navbar}>      
        <Link href="/kottur/">
            <a className ={styles.navbar_link}>
                Kettir
            </a>
        </Link>      
        <Link href="/raektanir/">
            <a className ={styles.navbar_link}>
                Ræktanir
            </a>
        </Link>
        <Link href="/felagi/">
            <a className ={styles.navbar_link}>
                Félagar
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