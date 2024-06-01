import React, { useState }  from 'react'
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import toast from 'react-hot-toast';


const CheckEmailLoginPage = () => {

	const [email, setEmail] = useState(''); 

	const navigate = useNavigate(); 

	const handleEmailInput = (e) => { 
		setEmail(e.target.value); 
	} 

	const handleFormSubmission = async (e) => {
		e.preventDefault();
		e.stopPropagation(); 
		
		axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login/checkemail`, {email})
		.then( (response) => {
			toast.success(response?.data?.message);
			setEmail(''); 
			navigate('/login-password', {
				state : response?.data?.data 
			}); 
		})
		.catch( (err) => {
			toast.error(err?.response?.data?.message); 
			console.log(`Error occured while calling api for verifying email: ${err}`); 
		}) 
	}

	return (
		<div className='pt-5 pb-3 md:pt-8 md:pb-6 flex justify-center items-center select-none'>
			<div className='bg-zinc-800 w-full max-w-sm rounded-2xl overflow-hidden p-4 flex flex-col justify-center items-center mx-5'>

				<h3 className='text-2xl text-yellow-200 font-serif mt-4 text-center'>Verify Your Email For <br/> Logging In</h3> 

				<div className='mt-6 bg-white p-5 rounded-full'>
					<FaUser className='text-[150px]' />
				</div>

				<form onSubmit={handleFormSubmission} className='grid gap-4 mt-3'>
					<div className='flex flex-col'>
						<label className='text-lg text-white font-sans mx-2 cursor-pointer' htmlFor='email'>Email: </label>
						<input
							type='email' 
							id='email'
							name='email'
							placeholder='Enter your email'
							className='px-2 py-1 focus:outline-blue-600 rounded-md mt-1 mx-2 w-72'
							value={email}
							onChange={handleEmailInput}
							required
						/>
					</div>
					<div className='flex justify-center items-center'>
						<button id='glow-button' type='submit' className='bg-blue-400 px-5 py-2 h-11 w-40 rounded-xl mt-5 mb-2 hover:bg-green-500 hover:text-black font-sans text-lg font-medium text-white'>Verify Email</button> 
					</div>
				</form>

				<p className='text-white my-2'>New user? <Link to={'/signup'} className='text-yellow-200 hover:text-green-400'> Sign Up </Link> </p>
			</div>
		</div>
	)
}

export default CheckEmailLoginPage; 