import type { NextPage } from 'next'
import { CatSearch } from '../../lib/components/search/catSearch/catSearch';
import { connectAdminLogin } from '../../lib/components/authentication/LoginUtils';

export const CatSearchPage: NextPage = () => {
    return <CatSearch/>
};

export default connectAdminLogin(CatSearchPage);