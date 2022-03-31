import React, { useState} from 'react';
import useSWR from 'swr'
import styles from '../../styles/Search.module.css';

// Declaring type of props - see "Typing Component Props" for more examples
type Props = {
    onSearch : Function
  }; /* use `interface` if exporting so that consumers can extend */
  
  // Easiest way to declare a Function Component; return type is inferred.
const Searchbar = ({onSearch }: Props) => {
    let [searchterm, changesearchterm] = useState("");
    return <div>
        <div className={styles.searchbar}>
            <input autoComplete="off" value={searchterm} onChange={x => changesearchterm(x.target.value)}></input>
            <button className = {styles.searchbutton} onClick={e => onSearch(searchterm)}></button>
        </div>
    </div>
};

export default Searchbar;