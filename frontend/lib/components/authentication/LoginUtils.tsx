import { NextRouter, useRouter } from 'next/router';
import { getStorageObject, removeStorage, setStorageObject } from '../../storage/useStorage';
import type { NextPage } from 'next';

interface AuthResponse {
    is_authenticated : boolean,
}

const processValidation = (data: AuthResponse, storage : any, router : NextRouter) => {
    if(data.is_authenticated){
        storage.lastVerified = new Date(new Date().getTime() + 5 * 60000)
        setStorageObject("user", storage, new Date(new Date().getTime() + 30 * 60000).getTime())
    } else {
        removeStorage("user");
        router.push('/login');
        return null;
    }
}

export const connectAdminLogin = (Component: NextPage) => {
    const ConnectedAdminComponent = () => {
        const router = useRouter();
        console.log("aaaa");
        if (typeof window !== 'undefined'){
            console.log("user?", getStorageObject("user"))
            const storage = getStorageObject("user");
            if(!storage){
                router.push('/login');
                return null;
            } else {
                if(!storage.lastVerified || new Date(storage.lastVerified) < new Date()){
                    const a = fetch("/api/v1/auth/validate").then(d => {
                        d.json().then(d => processValidation(d, storage, router))
                    });
                }
            }
        }
        return <Component/>
    }

    return ConnectedAdminComponent;
}