import React, { useEffect, useState } from "react";
import { Entry, Show } from "../../../types";
import showStyle from './styles.module.css'
import profileStyle from '../styles.module.css'
import { ComponentNavigator } from "../../componentNavigator";
import { SortableTable } from "../../blocks/Tables/SortableTable/SortableTable";
import { SortableElement } from "../../blocks/Tables/SortableTable/SortableElement";

interface P {
    show : Show,
    entries: Entry[]
}

const A = ({show} : P) => {
    return <b>{show.name}</b>
}

const createSortableElement= (key : string, element : any)  : SortableElement  => {
    return {
        key,
        element
    }
}
const B = ({entries} : P) => {
    return <SortableTable 
        column_keys={["catalog_nr","registry_nr","name","ems"]}
        headings={["Sýninganúmer", "Skráninganúmer", "Nafn", "EMS"]}
        items={entries.map((entry) => (
            {
                catalog_nr : entry?.catalog_nr,
                registry_nr : createSortableElement(entry.cat_model?.registries[0]?.registry || "",
                    <a href={`/cat/${entry.cat_model?.id}`}>{entry.cat_model?.registries[0]?.registry}</a>
                ),
                name : entry?.cat_model?.name,
                ems : entry?.cat_model?.colors[0]?.ems
            }))}
        />
}
const C = ({show} : P) => {
    return <h1>C</h1>
}
export const ShowProfile = ({show, entries} : P) => {
    const pages = [A,B,C];
    return <div className={profileStyle.profileWrapper}>
        <div className={profileStyle.title}>
            <h1>{show.name}</h1>
            <h3>{show.location}, {show.date}</h3>
        </div>
        <div>
            <ComponentNavigator 
                items={["Yfirlit", "Keppendur", "Sýningarritun "]}
                pages={pages}
                props={{show, entries}}
            />
        </div>
    </div>
}