import React from 'react';
import styles from "../../styles/Headercomponents.module.css";
import Link from 'next/link';

const createSection = (sectName, items) => {
    return {
        name : sectName,
        items : items
    }
}

const createItems = (text, link) => ({
    text,
    link
})

const sections = [
    createSection("Kettir", [
        createItems("Leita", "/cat/"),
        createItems("Skrá Húskött", "/cat/testform/"),
    ]),      
    createSection("Ræktanir", [
        createItems("Leita", "/cattery/"),
    ]),    
    createSection("Sýningar", [
        createItems("Yfirlit", "/show/"),
    ]),    
    createSection("Félagar", [
        createItems("Leita", "/member/"),
    ]),
]

export const Sidebar = () => {
    return <div className='sidebar'>
        {sections.map(section => <Section name={section.name} items={section.items}/>)}
    </div>
}

export const Section = ({name, items}) => {
    return <div>
        <h3>{name}</h3>
        <ul>
            {items.map(item => <li><Link href={item.link}>{item.text}</Link></li>)}
        </ul>
    </div>
}