import type { NextPage } from 'next'
import { connectAdminLogin } from '../../lib/components/authentication/LoginUtils';
import { SinglePageForm, Housecat, Person } from '../../lib/components/forms';
import { Cat } from '../../lib/types';


export const CatTestFormPage: NextPage = () => {

    return <SinglePageForm
        onSubmit={handleSubmit}
        fields={
            {
                cat : Housecat,
                person : Person
            }
        }
    />
};

const handleSubmit = (data : any ) => {
    const {cat, person} = data;
    fetch("/api/v1/cat", {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body : JSON.stringify(cat)
    }).then(response => {
        if(response.status === 200 || response.status === 201){
            response.json().then((c : Cat) => {
                console.log("returned cat", c);
                fetch("/api/v1/cat/"+c.id, {
                    method: "DELETE"
                });
            });
        } else {
            console.log("Cat error!");
        }
    })
}

export default connectAdminLogin(CatTestFormPage);