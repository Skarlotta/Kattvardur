import React, {ReactElement, useEffect} from 'react';
import Cat from '../../models/Cat';
import styles from '../../styles/Search.module.css';
import Link from 'next/link';


type Props = {
    children: ReactElement
}
type ItemProps = {
    item: any
}
const SearchResult = ({children} : Props) => <div className={styles.search_result}>
    {children}
</div>;

const CatSearchResult = (cat: Cat) => {
    let fullName = cat.cattery ? (cat.cattery.object.prefix ? cat.cattery.object.name +" "+ cat.object.name : cat.object.name +" "+ cat.cattery.object.name) : cat.object.name;
    let ems = cat.object.colors.length > 0 ? "Ems : " + cat.object.colors[0].ems : "Ems óþekkt";
    let microchip =  cat.object.microchips.length > 0 ? "Örmerking : " + cat.object.microchips[0].microchip : "Engin Örmerking";
    let registry = cat.object.registries.length > 0 ? cat.object.registries[0].registry : "Ekkert skráninganúmer";
    return <SearchResult>
        <Link href={"/kottur/"+cat.object.id.toString()+"/"}><a>
            <span><h2>{fullName} - <i>{registry}</i></h2> 
            <span>{ems}</span> <br></br>
            <span>{microchip}</span></span>
        </a>
        </Link>
    </SearchResult>;
}

export {SearchResult, CatSearchResult}