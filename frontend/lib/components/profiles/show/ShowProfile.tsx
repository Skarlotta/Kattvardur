import React from "react";
import { Show } from "../../../types";
import showStyle from './styles.module.css'
import profileStyle from '../styles.module.css'
import { ComponentNavigator } from "../../componentNavigator";

interface P {
    show : Show
}

const A = ({show} : P) => {
    return <b>{show.name}</b>
}
const B = ({show} : P) => {
    return <b>{show.judges.map(judge => <p>judge.name</p>)}</b>
}
const C = ({show} : P) => {
    return <h1>C</h1>
}
export const ShowProfile = ({show} : P) => {
    const pages = [A,B,C];
    return <div className={profileStyle.profileWrapper}>
        <div className={profileStyle.title}>
            <h1>{show.name}</h1>
            <h3>{show.location}, {show.date}</h3>
        </div>
        <div>
            <ComponentNavigator 
                items={["Yfirlit", "Úrslit", "Sýningarritun "]}
                pages={pages}
                props={{show}}
            />
        </div>
    </div>
}