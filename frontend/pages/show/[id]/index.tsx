import type { NextPage } from 'next'
import { connectAdminLogin } from '../../../lib/components/authentication/LoginUtils';
import { Person,ApiShow, Show, Entry, Judge } from '../../../lib/types';
import { useEffect, useState } from 'react';
import { ShowManager } from '../../../lib/models/Show';
import { useRouter } from 'next/router'
import { ShowProfile } from '../../../lib/components/profiles/show/ShowProfile';
import { EntryManager } from '../../../lib/models/Entry';

const ShowPage: NextPage = () => {
    const router = useRouter();
    const id = router.query.id;
    const [show, setShow] = useState<Show>();
    const [entries, setEntries] = useState<Entry[]>([]);
    const [judges, setJudges] = useState<Judge[]>([]);
    useEffect(() => {
        ShowManager.get(id as string).then((show) => {
            setShow(show);
        });
        ShowManager.judges(id as string).then((judges) => {
            if(judges) setJudges(judges);
        });
        EntryManager.all(id as string).then((entries) => {
            if(entries){
                setEntries(entries);
            }
        });
    }, [id]);
    return show ? <ShowProfile show={show} entries={entries} judges={judges}/> : <b>loading</b>;
}


export default connectAdminLogin(ShowPage);
