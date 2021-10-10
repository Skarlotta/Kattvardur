import React from 'react';

const PersonRow = ({id, person}) => {
    return <tr key={id}>
        <td>
            {person.name}
        </td>
        <td>
            {person.is_member ? person.member_id : "Ekki Félagi"}
        </td>
        <td>
            {person.email}
        </td>
        <td>
            {person.address} - {person.postcode}{person.city}
        </td>
    </tr>
}

export {PersonRow};