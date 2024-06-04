import React, { useRef, useState, useEffect }  from 'react'
import { IoClose } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import toast from 'react-hot-toast';

import uploadFile from '../helpers/uploadFile'; 
import validateInputFields from '../helpers/validateInputFields';


const SignUpPage = () => {
    
    const imageInputRef = useRef(); 
 
    const [data, setData] = useState({
        name : '',
        email : '',
        password : '',
        profile_pic : '',
        cloudinary_img_public_id : ''
    }); 

    const [uploadPic, setUploadPic] = useState({}); 
    const [cloudinaryImgPublicID, setCloudinaryImgPublicID] = useState(''); 
    const navigate = useNavigate(); 

    const [imageUploadOrDeleteLoading, setImageUploadOrDeleteLoading] = useState(false); 

    const handleUploadPic = async (e) => {
        
        e.preventDefault(); 
        e.stopPropagation(); 

        setImageUploadOrDeleteLoading(true); 
        const pic = e.target.files[0]; 

        setUploadPic(pic); 
        
        try{
            const uploadedPic = await uploadFile(pic); 
    
            setCloudinaryImgPublicID(uploadedPic?.public_id); 

            setData({
                ...data, 
                profile_pic : uploadedPic?.secure_url, 
                cloudinary_img_public_id : uploadedPic?.public_id 
            })

            setImageUploadOrDeleteLoading(false); 
        }
        catch(err){
            toast.error(err?.response?.data?.message); 
            setImageUploadOrDeleteLoading(false); 
            console.log(err); 
        }
    }

    const removePic = async (e) => {

        e.preventDefault();
        e.stopPropagation(); 
        
        setImageUploadOrDeleteLoading(true);

        if(data.profile_pic !== ''){
            imageInputRef.current.value = ''; 
            setUploadPic({});
            setData({
                ...data,
                profile_pic : '',
                cloudinary_img_public_id : ''
            })
        }

        try{
            if(cloudinaryImgPublicID !== ''){
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/delete-cloudinary-asset`, {
                    public_id : cloudinaryImgPublicID
                })
                setCloudinaryImgPublicID(''); 
                toast.success(response?.data?.message); 
                setImageUploadOrDeleteLoading(false);
            }
        }
        catch(err){
            toast.error(err?.response?.data?.message); 
            setImageUploadOrDeleteLoading(false);
            console.log(`Error occured while calling api for deleting cloudinary asset: ${err}`); 
        }
    }
    
    const [loadingForFormSubmission, setLoadingForFormSubmission] = useState(false); 

    const handleFormSubmission = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        
        setLoadingForFormSubmission(true); 
        
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, data)
        .then( (response) => {
            
            toast.success(response?.data?.message); 

            imageInputRef.current.value = ''; 
            setUploadPic({});
            setCloudinaryImgPublicID(''); 
            setData({
                name : '',
                email : '',
                password : '',
                profile_pic : '',
                cloudinary_img_public_id : ''
            });    
            
            navigate('/login-email'); 
        })
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            setLoadingForFormSubmission(false); 
            console.log(`Error occured while calling api for signing up user: ${err}`); 
        }) 
    }
    
    const cleanUpFunction = async (e) => {
        
        if(imageUploadOrDeleteLoading){
            e.preventDefault();
            toast.error('You cannot navigate away from SignUp page when profile pic is getting uploaded or deleted'); 
            return;
        }
        
        if(data.profile_pic !== ''){
            imageInputRef.current.value = ''; 
            setUploadPic({});
            setData({
                name : '',
                email : '',
                password : '',
                profile_pic : '',
                cloudinary_img_public_id : ''
            });  
        }

        try{
            if(cloudinaryImgPublicID !== ''){
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/delete-cloudinary-asset`, {
                    public_id : cloudinaryImgPublicID
                })
                setCloudinaryImgPublicID(''); 
            }
        }
        catch(err){
            toast.error(err?.response?.data?.message); 
            console.log(`Error occured while calling api for deleting cloudinary asset: ${err}`); 
        }
    }
        
    
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const eyeIcon = passwordVisible ? <FiEye onClick={ () => {setPasswordVisible(false)} } /> : <FiEyeOff onClick={ () => {setPasswordVisible(true)} } />; 
    const passwordInputFieldType = passwordVisible ? 'text' : 'password'; 


    const [isNameErrorTextInvisible, setIsNameErrorTextInvisible] = useState(true);  
    const [nameErrorText, setNameErrorText] = useState('Display Name Error Text'); 

    const [isEmailErrorTextInvisible, setIsEmailErrorTextInvisible] = useState(true);  
    const [emailErrorText, setEmailErrorText] = useState('Display Email Error Text'); 
    
    const [isPasswordErrorTextInvisible, setIsPasswordErrorTextInvisible] = useState(true);  
    const [passwordErrorText, setPasswordErrorText] = useState('Display Password Error Text'); 

    const handleFormInput = (e) => {
        
        const {name, value} = e.target;         
        setData({...data, [name] : value}); 
 
        validateInputFields(name, value, {
            setIsNameErrorTextInvisible,
            setNameErrorText,
            setIsEmailErrorTextInvisible,
            setEmailErrorText,
            setIsPasswordErrorTextInvisible,
            setPasswordErrorText
        }); 
    }


    const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState(true); 

    useEffect( () => {
        if(isNameErrorTextInvisible && isEmailErrorTextInvisible && isPasswordErrorTextInvisible && !imageUploadOrDeleteLoading){
            setIsSignUpButtonDisabled(false); 
        }
        else{
            setIsSignUpButtonDisabled(true); 
        }
    }, [isEmailErrorTextInvisible, isNameErrorTextInvisible, isPasswordErrorTextInvisible, imageUploadOrDeleteLoading]); 


    const inputFieldCSS = 'px-2 py-1 focus:outline-blue-600 rounded-md mt-1 mx-2 w-72'; 
    const inputFieldErrorMessageCSS = 'text-[10px] text-red-500 px-2 font-mono rounded-md mt-1 mx-2 w-72 '; 
    const labelCSS = 'text-md text-white font-sans mx-2 cursor-pointer'; 


    return (
        <div className='pt-5 pb-3 md:pt-7 md:pb-3 flex justify-center items-center select-none'>
            <div className='bg-zinc-800 w-full max-w-sm rounded-2xl overflow-hidden p-4 flex flex-col justify-center items-center mx-5'>

                <h3 className='text-3xl text-yellow-200 font-serif mt-2'> Welcome to ChatIt </h3> 
                <h3 className='text-md text-white font-serif'> &#8226; Sign Up using G-mail</h3> 
            
                <form onSubmit={handleFormSubmission} className='grid gap-1 mt-5'>
                    <div className='flex flex-col'>
                        <label className={labelCSS} htmlFor='name'>Name <span className='text-red-600'>*</span> </label>
                        <input
                            type='text' 
                            id='name'
                            name='name'
                            placeholder='Enter your name'
                            className={inputFieldCSS}
                            value={data.name}
                            onChange={handleFormInput}
                            required
                        />
                        <p className={ inputFieldErrorMessageCSS + `${isNameErrorTextInvisible && 'invisible'}`}> {nameErrorText} </p>
                    </div>
                    <div className='flex flex-col'>
                        <label className={labelCSS} htmlFor='email'>Email <span className='text-red-600'>*</span> </label>
                        <input
                            type='text' 
                            id='email'
                            name='email'
                            placeholder='Enter your email'
                            className={inputFieldCSS}
                            value={data.email}
                            onChange={handleFormInput}
                            required
                        />
                        <p className={inputFieldErrorMessageCSS + `${isEmailErrorTextInvisible && 'invisible'}`}> {emailErrorText} </p>
                    </div>
                    <div className='flex flex-col'>
                        <label className={labelCSS} htmlFor='password'>Password <span className='text-red-600'>*</span> </label>
                        <div className='flex relative'>
                            <input
                                type={passwordInputFieldType} 
                                id='password'
                                name='password'
                                placeholder='Enter your password'
                                className='pl-2 pr-10 py-1 focus:outline-blue-600 rounded-md mt-1 mx-2 w-72'
                                value={data.password}
                                onChange={handleFormInput}
                                required
                            />
                            <button className='absolute top-2 right-4 cursor-pointer p-1 rounded-full'> {eyeIcon} </button>
                        </div>
                        <p className={inputFieldErrorMessageCSS + `${isPasswordErrorTextInvisible && 'invisible'}`}> {passwordErrorText} </p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-md text-white font-sans mx-2 mt-1.5'>Profile Pic </p>
                        <label htmlFor='profile_pic' className='file-upload-label h-14 w-72 max-w-72 bg-slate-600 rounded-xl mt-1 border-2 border-slate-600 hover:border-blue-400 flex justify-center items-center cursor-pointer mx-2'>
                            {
                                imageUploadOrDeleteLoading && 
                                <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-2 border-t-blue-600" />
                            }
                            {
                                !imageUploadOrDeleteLoading &&
                                <>
                                    <p className='text-sm text-white font-sans max-width-[260] pl-3 overflow-hidden flex gap-2 justify-center items-center'> 
                                        {uploadPic?.name ? uploadPic.name : 'Click Here to Upload'} 
                                        {uploadPic?.name ? '' : <FaRegImage />}
                                    </p>
                                    {uploadPic?.name && 
                                        <button disabled={loadingForFormSubmission} className={`pl-1 pr-2 ${loadingForFormSubmission ? 'invisible' : 'visible'}`} onClick={removePic}>
                                            <IoClose className='rounded-xl hover:bg-red-500 text-white' /> 
                                        </button>
                                    }       
                                </>
                            }
                        </label>
                    
                        <input
                            disabled={imageUploadOrDeleteLoading || data.profile_pic !== ''}
                            ref={imageInputRef}
                            type='file' 
                            id='profile_pic'
                            name='profile_pic'
                            className='hidden'
                            onChange={handleUploadPic}
                        />
                    </div>
                    <div className='flex justify-center items-center'>
                        <button disabled={isSignUpButtonDisabled || loadingForFormSubmission} type='submit' 
                            className={ `${isSignUpButtonDisabled ? 'bg-red-400' : 'glow-button bg-blue-400 hover:bg-green-500 hover:text-black'} font-medium text-white font-sans text-lg px-5 py-2 h-11 w-40 rounded-xl mt-6 mb-1` }>
                            Sign Up
                        </button> 
                    </div>
                </form>

                <p className='text-white my-2'>Already have an account? <Link to={'/login-email'} onClick={cleanUpFunction} className='text-yellow-200 hover:text-green-400'> Login </Link> </p>
            </div>
        </div>
    )
}

export default SignUpPage; 