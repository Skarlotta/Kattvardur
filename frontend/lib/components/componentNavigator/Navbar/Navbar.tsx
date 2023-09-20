import React from "react";
import style from './navbar.module.css';

interface NavbarProps {
    items : string[],
    page : number,
    setPage : (page : number) => void,
}

export const Navbar = ({items, page, setPage} : NavbarProps) => {
    return <div className={style.navbarWrapper}>
        {items.map((item, i) => <span className={(page === i) ? style.selectedLink : ""} key={i} onClick={() => setPage(i)}>{item}</span>)}
    </div>
}