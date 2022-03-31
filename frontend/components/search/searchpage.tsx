import React, {useState, ReactElement} from 'react';
import Searchbar from './searchbar';
import fetcher from '../../fetcher';
import Model from '../../models/Model';

type Props = {
    title : string,
    url : string,
    styleData : Function,
    processData :  Function
}

const Searchpage = ({title, url, styleData, processData} : Props) => {
    let [firstLoad, setFirstLoad] : [boolean, Function]= useState(false);
    let [data, setData] : [any[], Function]= useState([]);
    let [loading, setLoading] : [boolean, Function]= useState(false);

    function getResult(query: string){
        if(loading){
            return;
        }
        setLoading(true);
        setFirstLoad(true);
        fetcher(url + "?search=" + encodeURIComponent(query)).then(d => {
            processData(d).then((d:any[]) => {
                setData(d);
                setLoading(false);
            });
        });
    }
    
    let results : ReactElement[] = data.map((d : any) => styleData(d) );
    return <div>
        <h2>{title}</h2>
        <Searchbar onSearch={getResult}></Searchbar>
        <div>
            {results}
        </div>
    </div>;
}


export default Searchpage;