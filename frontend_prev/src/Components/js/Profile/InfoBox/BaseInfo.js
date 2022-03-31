import React from 'react';
import '../../../css/profile.css';
import EditableInfo from '../ProfileComponents/EditableInfo';

function BaseInfo({title,fields}){
    fields = fields.map(x => {
        if(x) return <tr key={x.key}>
                <td className="profile-infokey">
                    {x.title}
                </td>
                <td className="profile-info">
                    <EditableInfo type={x.type} onEdit={x.onEdit} value={x.value}></EditableInfo>
                </td>
            </tr>;
            return null;
        }
    )
    return <div>
        <h3 style={{'margin':0,'color':'var(--orange)', "width":"100%","paddingBottom":"1em", "borderBottom":"1px solid var(--orange)"}}>{title}</h3>
        <table className="profile-infotable">
            <tbody>
                {fields}
            </tbody>
        </table>
    </div>
}

export default BaseInfo;