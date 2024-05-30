import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'


const Home = () => {

	const fetchUserDetails = async () => {
		try{
			const response = await axios({
				method : 'get', 
				url : `${import.meta.env.VITE_BACKEND_URL}/api/user/details`, 
				withCredentials : true 
			}) 
			console.log('Current user details:', response); 
		}
		catch(err){
			console.log(`Error occured while fetching user details: ${err}`); 
		}
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