import React, { useState } from "react";
import styles from '../styles.module.css';
import { SortableElement, isSortableElement } from "./SortableElement";

interface P {
    headings : any[],
    items :(any | SortableElement)[],
    column_keys : string[],
}

export const SortableTable = ({headings, items, column_keys} : P) => {
    const [sortKey, setSortKey] = useState(column_keys[0]);
    const [sortDirection, setSortDirection] = useState(1);
    const setSort = (newKey : any) => {
        if(newKey !== sortKey){
            setSortDirection(1);
            setSortKey(newKey);
        } else {
            setSortDirection(-sortDirection);
        }
    }
    items.sort((a : any,b : any) => {
        const aKey =  isSortableElement(a[sortKey]) ? a[sortKey].key : a[sortKey];
        const bKey =  isSortableElement(b[sortKey]) ? b[sortKey].key : b[sortKey];

        return aKey === bKey ? 0 : aKey < bKey ? -sortDirection : sortDirection;
    });
    return <table className={styles.prettyTable}>
        <thead>
            <tr>
                {headings.map((heading, i) => <th key={heading} onClick={() => setSort(column_keys[i])}>
                    {heading} {sortKey == column_keys[i] ? (sortDirection === 1 ? "↓" : "↑") : undefined}
                </th>)
                }
            </tr>
        </thead>
        <tbody>
            {items.map((item : any, i) => <tr key={i}>
                {column_keys.map(key => <td key={key}>
                    { isSortableElement(item[key]) ? item[key].element : item[key]}
                </td>)}
            </tr>)}
        </tbody>
    </table>
}