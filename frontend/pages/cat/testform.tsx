import type { NextPage } from 'next'
import { connectAdminLogin } from '../../lib/components/authentication/LoginUtils';
import { SinglePageForm, Housecat, Person } from '../../lib/components/forms';


export const CatTestFormPage: NextPage = () => {
    const P = Person.map(f => {
        if(f.key === "name"){
            f = {
                ...f,
                key : "owner",
                label : "owner"
            }
        }

        return f;
    })
    console.log(Housecat.concat(P));
    return <SinglePageForm
        onSubmit={(d) => console.log("Submitted!", d)}
        fields={Housecat.concat(P)}
    />
};

export default connectAdminLogin(CatTestFormPage);