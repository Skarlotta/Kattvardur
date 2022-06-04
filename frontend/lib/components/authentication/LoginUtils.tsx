import { useRouter } from 'next/router'
import { getStorageObject } from '../../storage/useStorage';
import type { NextPage } from 'next'

export const connectAdminLogin = (component: NextPage) => {
    return () => {
        const router = useRouter();
        if (typeof window !== 'undefined'){
            if(!getStorageObject("user")){
                router.push('/login');
                return null;
            }
        }
        return component;
    }
}