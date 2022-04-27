import type { NextPage } from 'next'
import { useState } from 'react';
import Searchpage from '../../lib/components/search/searchpage';
import {CatSearchResult} from '../../lib/components/search/searchresults';
import Cat from '../../models/Cat';

const processCatResults = (cats : any[]) => {
    let p = new Promise<Cat[]>((resolve, fail) => {
        let d:number = cats.length;
        let catArray : Cat[] = [];
        for(let cat of cats){
            let newCat = new Cat(cat);
            newCat.getCattery().then(c => {
                console.log(c);
                catArray.push(c);
                if(catArray.length === d){
                    resolve(catArray);
                }
            })
        }
    });
    return p;
};

const CatSearchPage: NextPage = () => {
    return <Searchpage title="Finna Kött" url="/api/v1/cat/" styleData = {CatSearchResult} processData={processCatResults}></Searchpage>;
};

export default CatSearchPage
