import type { NextPage } from 'next'
import Image from 'next/image'
import logo from '../public/images/logo.jpg';
import { getStorageObject } from '../lib/storage/useStorage';
import {User} from '../lib/types/User';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'


const Home: NextPage = () => {
    const router = useRouter();
	if (typeof window !== 'undefined'){
        if(!getStorageObject("user")){
            router.push('/login');
        }
    }

	const [user, setUser] = useState<User|undefined>(undefined);
	useEffect(() => {
		if(!user){
			const u:User = getStorageObject('user');
			setUser(u);
		}
	})

	return <div style={{textAlign: "center"}}>
		<h3>Góðan dag {user && user?.first_name} </h3>
		<div style={{width: '100%', height:"25rem", position: 'relative'}}>
			<Image 
			src={logo} 
			alt="Kynjakettir" 
			layout='fill'
			objectFit='contain'/>  
		</div>
	</div>
}

export default Home
