import type { NextPage } from 'next'
import { connectAdminLogin } from '../../lib/components/authentication/LoginUtils';

const Show: NextPage = () => {
    return <p>Not implemented</p>;
}

export default connectAdminLogin(Show);
