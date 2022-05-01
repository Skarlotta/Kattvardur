import type { NextPage } from 'next'
import GoogleLogin from '../lib/components/authentication/GoogleLogin';
import { GetStaticProps } from 'next'
import { setStorage, getStorage } from '../lib/storage/useStorage';
import { useRouter } from 'next/router'

interface P {
    clientId: string,
    children: any,
}

const Login: NextPage<P> = ({clientId}) => {
    if(getStorage("user")){
        const router = useRouter();
        router.push('/');
    }
    return <GoogleLogin
        clientId={clientId}
        onLogin={(user) => {
            setStorage("user", user);
            const router = useRouter();
            router.push('/');
        }}
    />;
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props:{
            clientId:process.env.KATTVARDUR_GOOGLE_CLIENT_ID
        }
    }
}
  
export default Login
