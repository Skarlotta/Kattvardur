import type { NextPage } from 'next'
import { useState } from 'react';
//import Searchpage from '../../lib/components/search/genericSearch/genericSearch';
//import {CatterySearchResult} from '../../lib/components/search/genericSearch/searchresults';
import Cattery from '../../models/Cattery';

const processCatteryResults = (catteries : any[]) => {
    let p = new Promise<Cattery[]>((resolve, fail) => {
        let d:number = catteries.length;
        let catteryArray : Cattery[] = [];
        for(let cattery of catteries){
            let newCattery = new Cattery(cattery);
            catteryArray.push(newCattery);
        }
        resolve(catteryArray);
    });
    return p;
};

const CatterySearchPage: NextPage = () => {
    return null;// <Searchpage title="Finna Ræktun" url="/api/v1/cattery/" styleData = {CatterySearchResult} processData={processCatteryResults}></Searchpage>;
};

export default CatterySearchPage
