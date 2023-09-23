import React, { useState } from "react";
import { Entry, Show } from "../../types";
import { ColorJudgement, EntryJudgement, Files, Finals, LitterJudgement, Overview } from "./subtools";
import Style from './style.module.css';

interface P {
    show : Show,
    entries : Entry,
}

interface pageP {
    name : string,
    component : any,
    key : number
}

const pages : pageP[]= [
    {
        name : "Yfirlit",
        component: Overview,
        key : 0
    },
    {
        name : "Litadómur",
        component: ColorJudgement,
        key : 1
    },
    {
        name : "Dómur",
        component: EntryJudgement,
        key : 2
    },
    {
        name : "Got",
        component: LitterJudgement,
        key : 3
    },
    {
        name : "Úrslit",
        component: Finals,
        key : 4
    },
    {
        name : "Skjöl",
        component: Files,
        key : 5
    },
]


interface PagenavigatorProps {
    selectedPage : pageP,
    setPage : (page : pageP) => any
}

const Pagenavigator = ({selectedPage, setPage} : PagenavigatorProps) => {
    return <div className={Style.navbar}>
        {pages.map((page) =><a 
            key={page.key}
            className={selectedPage == page ? Style.selected : ""}
            onClick={() => setPage(page)}>
                {page.name}
        </a>
        )}
    </div>  
}


export const Showmanagement = ({show, entries} : P) => {
    const [page, setPage] = useState(pages[0]);
    const [overview, setOverview] = useState();

    const props = {
        show,
        entries
    }
    return <div>
        <Pagenavigator
            selectedPage={page}
            setPage={setPage}
        />
        <page.component {...props}/>
    </div>
}