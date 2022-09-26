import type { NextPage } from 'next'
import { MemberSearch } from '../../lib/components/search/memberSearch/memberSearch'
import { connectAdminLogin } from '../../lib/components/authentication/LoginUtils';

const Person: NextPage = () => {
    return <MemberSearch/>;
}

export default connectAdminLogin(Person);
