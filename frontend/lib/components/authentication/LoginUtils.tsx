import { useRouter } from 'next/router';
import { getStorageObject } from '../../storage/useStorage';
import type { NextPage } from 'next';

export const connectAdminLogin = (Component: NextPage) => {
    const ConnectedAdminComponent = () => {
        const router = useRouter();
        console.log("aaaa");
        if (typeof window !== 'undefined'){
            console.log("user?", getStorageObject("user"))
            if(!getStorageObject("user")){
                router.push('/login');
                return null;
            }
        }
        return <Component/>
    }

    return ConnectedAdminComponent;
}