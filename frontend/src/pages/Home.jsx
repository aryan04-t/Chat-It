import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, logout } from '../redux/userSlice'
import toast from 'react-hot-toast'


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
		<div>
		
			Home

			<section>
				<Outlet />
			</section>

		</div>
	)
}

export default Home