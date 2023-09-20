import type { NextPage } from 'next'
import { connectAdminLogin } from '../../../lib/components/authentication/LoginUtils';
import { Person,ApiShow, Show } from '../../../lib/types';
import { useEffect, useState } from 'react';
import { ShowManager } from '../../../lib/models/Show';
import { useRouter } from 'next/router'
import { ShowProfile } from '../../../lib/components/profiles/show/ShowProfile';

const ShowPage: NextPage = () => {
    const router = useRouter();
    const id = router.query.id;
    const [show, setShow] = useState<Show>();
    useEffect(() => {
        ShowManager.get(id as string).then((show) => {
            setShow(show);
        });
    }, [id]);
    return show ? <ShowProfile show={show}/> : <b>loading</b>;
}


export default connectAdminLogin(ShowPage);
