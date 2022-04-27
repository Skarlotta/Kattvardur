import React, { useState} from 'react';
import useSWR from 'swr'
import styles from '../../styles/Search.module.css';

type Props = {
    onSearch : Function
  }; 
  
const Searchbar = ({onSearch}: Props) => {
    let [searchterm, changesearchterm] = useState("");
    return <form onSubmit={(e)=>{e.preventDefault()}}>
        <div className={styles.searchbar}>
            <input autoComplete="off" value={searchterm} onChange={x => changesearchterm(x.target.value)}></input>
            <button className = {styles.searchbutton} onClick={e => onSearch(searchterm)}></button>
        </div>
    </form>
};

export default Searchbar;