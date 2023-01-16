import type { NextPage } from 'next'
import GoogleLogin from '../lib/components/authentication/GoogleLogin';
import { GetStaticProps } from 'next'
import { getStorageObject, setStorageObject } from '../lib/storage/useStorage';
import { useRouter } from 'next/router'
import styles from '../lib/styles/login.module.css';


interface P {
    clientId: string,
    children: any,
}

const Login: NextPage<P> = ({clientId}) => {
    const router = useRouter();
    if (typeof window !== 'undefined'){
        if(getStorageObject("user")){
            router.push('/');
        }
    }
    return <div className = {styles.loginPage}>
        <div className={styles.loginIntroText}>
            <h2>Velkomin á Kattvarð, innri gagnagrunn Kynjakatta - Kattaræktarfélags Íslands</h2>
            <p>
                Kattvarður er innra stjórnarkerfi félagsins, og heldur það utan um allar upplýsingar um ræktunarketti sem skráðir eru í 
                félagið, ræktendur þeirra, sýningar á vegum félagsins, og aðra nauðsynlega bókvörslu og stafræn skyldustörf. 
                Sem stendur er Kattvarður einungis opinn stjórnarmeðlimum og aðilum sem starfa með gögn félagsins.
            </p>

            <b>Vinsamlegast skráðu þig inn með þeim Google reikningi sem er á skrá Kynjakatta.</b><br/>
            <i>Ef vandamál eiga sér stað við innskráningu hafið samband við stjórn.</i><br></br>
        </div>
        <div>
            <GoogleLogin
                    clientId={clientId}
                    onLogin={(user) => {
                        setStorageObject("user", user);
                        router.push('/');
                    }}
                />
        </div>
    </div>;
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props:{
            clientId:process.env.KATTVARDUR_GOOGLE_CLIENT_ID || ""
        }
    }
}
  
export default Login
