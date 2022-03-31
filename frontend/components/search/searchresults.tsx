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
    return <SearchResult>
        <span><b>{cat.object.name}</b></span>
    </SearchResult>;
}

export {SearchResult, CatSearchResult}