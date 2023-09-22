import type { NextPage } from 'next'
import { connectAdminLogin } from '../../lib/components/authentication/LoginUtils';
import { Person,ApiShow, Show } from '../../lib/types';
import { jsonFetch } from '../../fetcher';
import { useEffect, useState } from 'react';
import { PrettyTable } from '../../lib/components/blocks/Tables/ModelTable/ModelTable';
import { ShowManager } from '../../lib/models/Show';

const ShowOverview: NextPage = () => {
    const [shows, setShows] = useState<Show[]>([]);
    useEffect(() => {
        ShowManager.all().then((shows) => {
            setShows(shows.sort((a,b) => b.date < a.date ? -1 : 1));
        });
    }, []);

    return <PrettyTable
        fields={["show", "date", "organizer", "location"]}
        objects={shows.map(show => ({
            ...show,
            show : <a href={show.id}>{show.name}</a>,
            organizer : show?.organizer?.name,
        }))}
        headings={["show","date","organizer","location"]}
    />
}


export default connectAdminLogin(ShowOverview);
