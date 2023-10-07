import React, { useEffect, useState } from "react";
import { Entry, Show, ShowOverview } from "../../../../types";
import { ShowManager } from "../../../../models/Show";
import { SortableTable } from "../../../blocks/Tables/SortableTable/SortableTable";
import Style from '../styles.module.css';

interface P {
    title : string,
    items : any[]
}

export const Boxtable = ({title, items} : P) => <div>
    <b>{title}</b>
    <div className={Style.boxtable}>
        {items.map(item => <div key={item}>{item}</div>)}
    </div>
</div>