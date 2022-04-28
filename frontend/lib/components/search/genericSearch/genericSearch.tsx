import React, {useState, ReactElement} from 'react';
import Searchbar from '../../blocks/searchbar/searchbar';
import fetcher from '../../../../fetcher';
import styles from '../../../styles/Search.module.css';

export interface GenericSearchProps {
    title : string,
    url : string,
    styleData : Function,
    processData? :  Function
}

export const GenericSearch = function<Type>({title, url, styleData, processData} : GenericSearchProps) {
    let [firstLoad, setFirstLoad] = useState<boolean>(false);
    let [data, setData] = useState<Type[]>([]);
    let [loading, setLoading] = useState<boolean>(false);

    function getResult(query: string){
        if(loading){
            return;
        }
        setLoading(true);
        setFirstLoad(true);
        fetcher<Type[]>(url + "?search=" + encodeURIComponent(query)).then(d => {
            if(processData){ 
                processData(d).then((d:Type[]) => {
                    setData(d);
                    setLoading(false);
                });
            } else{
                setData(d);
                setLoading(false);
            }
        });
    }
    
    let results : ReactElement[] = data.map((d : any) => styleData(d) );
    return <div className={styles.searchPage}>
        <h2>{title}</h2>
        <Searchbar onSearch={getResult}></Searchbar>
        <div>
            {results}
        </div>
    </div>;
}