import type { NextPage } from 'next'
import { useState } from 'react';
import Searchpage from '../../components/search/searchpage';
import {CatSearchResult} from '../../components/search/searchresults';
import Cat from '../../models/Cat';

const CatSearchPage: NextPage = () => {
    return <Searchpage title="Finna Kött" url="/api/v1/cat/" styleData = {CatSearchResult} model={Cat}></Searchpage>;
}

export default CatSearchPage
