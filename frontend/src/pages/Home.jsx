import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, logout } from '../redux/userSlice'
import toast from 'react-hot-toast'

import Sidebar from '../components/Sidebar'


const Home = () => {

	const dispatch = useDispatch(); 
	const user = useSelector(state => state.user); 
	
	const navigate = useNavigate(); 

	const fetchUserDetails = async () => {
		axios({
			method : 'get', 
			url : `${import.meta.env.VITE_BACKEND_URL}/api/user/details`, 
			withCredentials : true 
		})
		.then( (response) => {
			dispatch(setUser(response?.data?.data)); 
		}) 
		.catch( (err) => {
			if(err?.response?.data?.logout){
				toast.error(err?.response?.data?.message); 
				dispatch(logout()); 
				navigate('/login-email'); 
			}
		})
	} 

	useEffect( () => {
		fetchUserDetails();
	}, [])

	return (
		<div className='grid lg:grid-cols-[400px,1fr] h-screen max-h-screen'>
			<section className='bg-blue-500'>
				<Sidebar />
			</section>

			<section>
				<Outlet />
			</section>
		</div>
	)
}

export default Home