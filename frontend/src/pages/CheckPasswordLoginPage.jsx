import React, { useEffect, useState }  from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios'; 
import toast from 'react-hot-toast';

import Avatar from '../components/Avatar.jsx';
import validateInputFields from '../helpers/validateInputFields.js';


const CheckPasswordLoginPage = () => {

	const [password, setPassword] = useState(''); 

	const navigate = useNavigate(); 
  	const location = useLocation(); 

	useEffect( () => {
		if(!location?.state?.name){
			navigate('/login-email'); 
		}
	}, []) 

	const [loadingForFormSubmission, setLoadingForFormSubmission] = useState(false); 

	const handleFormSubmission = (e) => {
		e.preventDefault();
		e.stopPropagation(); 
		
		setLoadingForFormSubmission(true); 

		axios({
			method : 'post', 
			url : `${import.meta.env.VITE_BACKEND_URL}/api/auth/login/checkpassword`, 
			data : {
				password, 
				userId : location?.state?._id 
			}, 
			withCredentials : true 
		})
		.then( (response) => {
			if(response?.data?.success){
				
				toast.success(response?.data?.message); 

				localStorage.setItem('jwt', response?.data?.token); 
				setPassword(''); 

				setLoadingForFormSubmission(false); 
				navigate('/'); 
			}
		})
		.catch( (err) => {
			toast.error(err?.response?.data?.message); 
			setLoadingForFormSubmission(false); 
			console.log(`Error occured while calling api for logging user in: ${err}`); 
		}) 
	}

	    
	const [passwordVisible, setPasswordVisible] = useState(false); 
    const eyeIcon = passwordVisible ? <FiEye /> : <FiEyeOff />; 
    const passwordInputFieldType = passwordVisible ? 'text' : 'password'; 

    const toggleEye = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        passwordVisible ? setPasswordVisible(false) : setPasswordVisible(true); 
    }


    const [isPasswordErrorTextInvisible, setIsPasswordErrorTextInvisible] = useState(true);  
    const [passwordErrorText, setPasswordErrorText] = useState('Display Password Error Text'); 

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true); 


	const handlePasswordInput = (e) => { 
		const value = e.target.value; 
		setPassword(value); 
		validateInputFields('password', value, {
			setIsPasswordErrorTextInvisible,
            setPasswordErrorText
		}); 
	} 

    useEffect( () => {
        if(isPasswordErrorTextInvisible){
            setIsLoginButtonDisabled(false); 
        }
        else{
            setIsLoginButtonDisabled(true); 
        }
    }, [isPasswordErrorTextInvisible]); 


	return (
		<div className='pt-4 pb-3 md:pt-7 md:pb-4 flex justify-center items-center select-none'>
			<div className='bg-zinc-800 w-full max-w-sm rounded-2xl overflow-hidden p-4 flex flex-col justify-center items-center mx-5'>

				<h3 className='text-2xl text-yellow-200 font-serif mt-2 text-center'>Enter Your Password For Logging In</h3> 

				<Avatar 
					name = {location?.state?.name}
					secureImageURL = {location?.state?.profile_pic}
					height = {220}
					width = {220}
        		/>

				<form onSubmit={handleFormSubmission} className='grid mt-3'>
					<div className='flex flex-col'>
						<label className='text-lg text-white font-sans mx-2 cursor-pointer' htmlFor='password'>Password <span className='text-red-600'>*</span> </label>
						<div className='flex relative'>
							<input
								type={passwordInputFieldType} 
								id='password'
								name='password'
								placeholder='Enter your password'
								className='pl-2 pr-10 py-1 focus:outline-blue-600 rounded-md mt-1 mx-2 w-72'
								value={password}
								onChange={handlePasswordInput}
								required
							/>
							<span onClick={toggleEye} className='absolute top-2 right-4 cursor-pointer p-1 rounded-full'> {eyeIcon} </span>
						</div>
						<p className={'text-[10px] text-red-500 px-2 font-mono rounded-md mt-1 mx-2 w-72 mb-3 ' + `${isPasswordErrorTextInvisible && 'invisible'}`}> {passwordErrorText} </p> 
					</div>
					<div className='flex justify-center items-center'>
                        <button disabled={isLoginButtonDisabled || loadingForFormSubmission} type='submit' 
                            className={ `${isLoginButtonDisabled ? 'bg-red-400' : 'glow-button bg-blue-400 hover:bg-green-500 hover:text-black'} font-medium text-white font-sans text-lg px-5 py-2 h-11 w-40 rounded-xl mb-2` }> 
                            Login 
                        </button> 
                    </div>
				</form>
				<p className='text-white mb-2 text-center'> Forgot Password?? <Link to={'/forgot-password'} className='text-yellow-200 hover:text-green-400'> Click Here </Link> </p>
			</div>
		</div>
	)
}

export default CheckPasswordLoginPage; 