import type { NextPage } from 'next'
import { jsonFetch } from '../../fetcher';
import { connectAdminLogin } from '../../lib/components/authentication/LoginUtils';
import { SinglePageForm, Housecat, Person as PersonForm } from '../../lib/components/forms';
import { transformHouseCat } from '../../lib/components/forms/src/lib/transforms/transforms';
import { Cat, Person } from '../../lib/types';


export const CatTestFormPage: NextPage = () => {

    return <SinglePageForm
        onSubmit={handleSubmit}
        fields={
            {
                cat : Housecat,
            }
        }
    />
};

const handleSubmit = async (data : any, resolve: any) => {
    const {cat} = data;
    try{
        const apiCat = await transformHouseCat(cat);
        jsonFetch<Cat>("/api/v1/cat", {
            method : "POST",
            body : JSON.stringify(apiCat)
        }).then(cat => {
            resolve(true, "Housecat " + cat?.registries[0]?.registry + " created!", "/cat/"+cat.id);
        }).catch(error => {
            resolve(false, "Submission failed : " + error.message, "");
        }); 
    } catch (ex : any) {
        resolve(false, "Unexpected error " + ex.message, "");
    }
}

export default connectAdminLogin(CatTestFormPage);