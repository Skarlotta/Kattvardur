import React, {ReactElement, useEffect} from 'react';
import styles from '../../../styles/Search.module.css';
import Link from 'next/link';


export interface GenericSearchResultProps {
    url: string,
    heading: string
    subheading?: string
    topString?: string
    bottomString?: string
}
export const GenericSearchResult = ({url, heading, subheading, topString, bottomString} : GenericSearchResultProps) => <div className={styles.search_result}>
    <Link href={url}>
        <a>
            <span><h2>{heading} - <i>{subheading}</i></h2> 
            <span>{topString}</span> <br></br>
            <span>{bottomString}</span></span>
        </a>
    </Link>
</div>;