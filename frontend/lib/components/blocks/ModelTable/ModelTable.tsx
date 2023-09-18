import React from "react";
import styles from './styles.module.css';

interface ModelListProps{
    headings : string[],
    fields : string[],
    objects : any[],
}


export const PrettyTable = ({headings, fields, objects} : ModelListProps) => {
    return <table className={styles.prettyTable}>
        <thead>
            <tr>
                {headings.map((h,i) => <th key={i}>{h}</th>)}
            </tr>
        </thead>
        <tbody>
            {objects.map(obj => <tr key={obj.id}>
                {fields.map(field => <td key={field}>
                    {obj[field]}
                </td>)}
            </tr>)}
        </tbody>
    </table>
}