import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setProfilePicPublicId, setOnlineUsers } from '../redux/userSlice'

import toast from 'react-hot-toast'

import io from 'socket.io-client'

import Sidebar from '../components/Sidebar'
import favicon from '../assets/favicon.png'
import sessionTimeOutLogout from '../helpers/sessionTimeOutLogout' 
import securityLogout from '../helpers/securityLogout'


const Home = () => {

	const dispatch = useDispatch(); 
	const user = useSelector(state => state.user); 

	console.log(user); 

	const navigate = useNavigate(); 
	const location = useLocation(); 

	const fetchUserDetails = () => {
		axios({
			method : 'get', 
			url : `${import.meta.env.VITE_BACKEND_URL}/api/user/details`, 
			withCredentials : true 
		})
		.then( (response) => {
			dispatch(setProfilePicPublicId(response?.data?.data?.cloudinary_img_public_id)); 
			dispatch(setUser(response?.data?.data)); 
		}) 
		.catch( (err) => {
			toast.error(err?.response?.data?.message); 
			console.log(err); 
			if(err?.response?.data?.logout){
				sessionTimeOutLogout(dispatch); 
				navigate('/login-email'); 
			}
		})
	} 

	useEffect( () => {
		if(!localStorage.getItem('jwt')){ 
			toast.error("Security Logout"); 
			securityLogout(dispatch); 
			navigate('/login-email'); 
		}
		else{
			fetchUserDetails();
		}
	}) 


	useEffect( () => {
		const socketConnection = io(import.meta.env.VITE_BACKEND_URL, {
			auth : {
				token : localStorage.getItem('jwt') 
			},
			transports : ['websocket'] 
		});  

		socketConnection.on('onlineUser', (data) => {
			console.log(data); 
			dispatch(setOnlineUsers(data)); 
		})

		return () => {
			socketConnection.disconnect(); 
		}
	}, []) 


	const basePath = location.pathname === '/'; 

	return (
		<div className='grid lg:grid-cols-[400px,1fr] h-screen max-h-screen'>
			<section className={`bg-zinc-800 ${!basePath && 'hidden'} lg:block`}>
				<Sidebar />
			</section>

			<section className={`${basePath && 'hidden'}`}>
				<Outlet />
			</section>

			<div className={`hidden lg:${!basePath && 'hidden'} lg:${basePath && 'block'} h-screen max-h-screen select-none`}>
				<div className='select-none h-full w-full flex flex-col items-center justify-center'> 
					<img
						src={favicon}
						height={250}
						width={250}
					/>
					<p className='text-white text-3xl font-serif mt-2 text-center'> Select user to send texts </p>
				</div>
			</div>
		</div>
	)
}

export default Home