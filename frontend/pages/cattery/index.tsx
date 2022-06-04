import type { NextPage } from 'next'
import {CatterySearch} from '../../lib/components/search/catterySearch/catterySearch'
import { connectAdminLogin } from '../../lib/components/authentication/LoginUtils';

const CatterySearchPage: NextPage = () => {
    return <CatterySearch/>;
};

export default connectAdminLogin(CatterySearchPage);
