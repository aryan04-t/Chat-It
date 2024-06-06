import React, { useState, useEffect }  from 'react'
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import toast from 'react-hot-toast';

import validateInputFields from '../helpers/validateInputFields';


const CheckEmailLoginPage = () => {

	const [email, setEmail] = useState(''); 
	const navigate = useNavigate(); 

	const [loadingForFormSubmission, setLoadingForFormSubmission] = useState(false); 

	const handleFormSubmission = (e) => {
		e.preventDefault();
		e.stopPropagation(); 

		setLoadingForFormSubmission(true); 
		
		axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login/checkemail`, {email})
		.then( (response) => {
			toast.success(response?.data?.message);
			setEmail(''); 
			navigate('/login-password', {
				state : response?.data?.data 
			}); 
			setLoadingForFormSubmission(false);
		})
		.catch( (err) => {
			toast.error(err?.response?.data?.message); 
			setLoadingForFormSubmission(false);
			console.log(`Error occured while calling api for verifying email: ${err}`); 
		}) 
	}

	
    const [isEmailErrorTextInvisible, setIsEmailErrorTextInvisible] = useState(true);  
    const [emailErrorText, setEmailErrorText] = useState('Display Email Error Text'); 
    
    const [isVerifyUserButtonDisabled, setIsVerifyUserButtonDisabled] = useState(true); 

	const handleEmailInput = (e) => { 
		const value = e.target.value; 
		setEmail(value); 
		validateInputFields('email', value, {
            setIsEmailErrorTextInvisible,
            setEmailErrorText 
        }); 
	} 
	
    useEffect( () => {
        if(isEmailErrorTextInvisible){
            setIsVerifyUserButtonDisabled(false); 
        }
        else{
            setIsVerifyUserButtonDisabled(true); 
        }
    }, [isEmailErrorTextInvisible]); 


	return (
		<div className='pt-5 pb-3 md:pt-8 md:pb-[18px] flex justify-center items-center select-none'>
			<div className='bg-zinc-800 w-full max-w-sm rounded-2xl overflow-hidden p-4 flex flex-col justify-center items-center mx-5'>

				<h3 className='text-2xl text-yellow-200 font-serif mt-4 text-center'>Enter Your G-mail For <br/> Logging In </h3> 

				<div className='mt-8 bg-white p-5 rounded-full overflow-hidden'>
					<FaUser className='text-[170px] h-[180px] w-[180px]' />
				</div>

				<form onSubmit={handleFormSubmission} className='grid gap-4 mt-3'>
					<div className='flex flex-col'>
						<label className='text-lg text-white font-sans mx-2 cursor-pointer' htmlFor='email'>Email <span className='text-red-600'>*</span> </label>
						<input
							type='text' 
							id='email'
							name='email'
							placeholder='Enter your email'
							className='px-2 py-1 focus:outline-blue-600 rounded-md mt-1 mx-2 w-72'
							value={email}
							onChange={handleEmailInput}
							required
						/>
						<p className={'text-[10px] text-red-500 pl-2 pr-1 font-mono rounded-md mt-1 mx-2 mb-1 w-72 ' + `${isEmailErrorTextInvisible && 'invisible'}`}> {emailErrorText} </p> 
					</div>
					<div className='flex justify-center items-center'>
                        <button disabled={isVerifyUserButtonDisabled || loadingForFormSubmission} type='submit' 
                            className={ `${isVerifyUserButtonDisabled ? 'bg-red-400' : 'glow-button bg-blue-400 hover:bg-green-500 hover:text-black'} font-medium text-white font-sans text-lg px-5 py-2 h-11 w-40 rounded-xl` }>
                            Verify User 
                        </button> 
                    </div>
				</form>

				<p className='text-white my-2'>New user? <Link to={'/signup'} className='text-yellow-200 hover:text-green-400'> Sign Up </Link> </p>
			</div>
		</div>
	)
}

export default CheckEmailLoginPage; 