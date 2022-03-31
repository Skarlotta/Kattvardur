import React, {ReactElement, useEffect} from 'react';
import Cat from '../../models/Cat';

type Props = {
    children: ReactElement
}
type ItemProps = {
    item: any
}
const SearchResult = ({children} : Props) => <div>
    {children}
</div>;

const CatSearchResult = (cat: Cat) => {
    let fullName = cat.cattery ? (cat.cattery.object.prefix ? cat.cattery.object.name +" "+ cat.object.name : cat.object.name +" "+ cat.cattery.object.name) : cat.object.name;
    return <SearchResult>
        <span><b>{fullName}</b></span>
    </SearchResult>;
}

export {SearchResult, CatSearchResult}