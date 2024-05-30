import React, { useRef, useState }  from 'react'
import { IoClose } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import toast from 'react-hot-toast';

import uploadFile from '../helpers/uploadFile';

const SignUpPage = () => {

    const imageInputRef = useRef();

    const [data, setData] = useState({
        name : '',
        email : '',
        password : '',
        profile_pic : ''
    }); 

    const [uploadPic, setUploadPic] = useState({}); 
    const [cloudinaryImgPublicID, setCloudinaryImgPublicID] = useState(''); 
    const navigate = useNavigate(); 

    const handleFormInput = (e) => {
        const {name, value} = e.target; 
        setData({...data, [name] : value}); 
    } 

    const handleUploadPic = async (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 

        const pic = e.target.files[0]; 

        setUploadPic(pic); 
        
        try{
            const uploadedPic = await uploadFile(pic); 
    
            setData({
                ...data,
                profile_pic : uploadedPic?.secure_url 
            })
    
            setCloudinaryImgPublicID(uploadedPic?.public_id); 
        }
        catch(err){
            toast.error(err.response.data.message); 
            console.log(err); 
        }
    }

    const removePic = async (e) => {
        e.preventDefault();
        e.stopPropagation(); 

        if(data.profile_pic !== ''){
            imageInputRef.current.value = ''; 
            setUploadPic({});
            setData({
                ...data,
                profile_pic : ''
            })
        }

        try{
            if(cloudinaryImgPublicID !== ''){
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/delete-cloudinary-asset`, {
                    public_id : cloudinaryImgPublicID
                })
                setCloudinaryImgPublicID(''); 
                toast.success(response?.data?.message); 
            }
        }
        catch(err){
            toast.error(err?.response?.data?.message); 
            console.log(`Error occured while calling api for deleting cloudinary asset: ${err}`); 
        }
    }
    
    const handleFormSubmission = async (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, data)
        .then( (response) => {
            toast.success(response?.data?.message); 
            imageInputRef.current.value = ''; 
            setUploadPic({});
            setData({
                name : '',
                email : '',
                password : '',
                profile_pic : ''
            });    
            navigate('/login-email'); 
        })
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            console.log(`Error occured while calling api for signing up user: ${err}`); 
        }) 
    }
        
    return (
        <div className='pt-5 pb-3 md:pt-8 md:pb-6 flex justify-center items-center select-none'>
            <div className='bg-zinc-800 w-full max-w-sm rounded-2xl overflow-hidden p-4 flex flex-col justify-center items-center mx-5'>

                <h3 className='text-3xl text-yellow-200 font-serif mt-4'>Welcome to ChatIt</h3> 
            
                <form onSubmit={handleFormSubmission} className='grid gap-4 mt-6'>
                    <div className='flex flex-col'>
                        <label className='text-lg text-white font-sans mx-2 cursor-pointer' htmlFor='name'>Name: </label>
                        <input
                            type='text' 
                            id='name'
                            name='name'
                            placeholder='Enter your name'
                            className='px-2 py-1 focus:outline-blue-600 rounded-md mt-1 mx-2 w-72'
                            value={data.name}
                            onChange={handleFormInput}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg text-white font-sans mx-2 cursor-pointer' htmlFor='email'>Email: </label>
                        <input
                            type='email' 
                            id='email'
                            name='email'
                            placeholder='Enter your email'
                            className='px-2 py-1 focus:outline-blue-600 rounded-md mt-1 mx-2 w-72'
                            value={data.email}
                            onChange={handleFormInput}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg text-white font-sans mx-2 cursor-pointer' htmlFor='password'>Password: </label>
                        <input
                            type='password' 
                            id='password'
                            name='password'
                            placeholder='Enter your password'
                            className='px-2 py-1 focus:outline-blue-600 rounded-md mt-1 mx-2 w-72'
                            value={data.password}
                            onChange={handleFormInput}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-lg text-white font-sans mx-2'>Profile Pic: </p>
                        <label id='file-upload-label' htmlFor='profile_pic' className='h-14 w-72 max-width-72 bg-slate-600 rounded-xl mt-0.5 border-2 border-slate-600 hover:border-blue-400 flex justify-center items-center cursor-pointer mx-2'>
                            <p className='text-sm text-white font-sans max-width-[260] pl-3 overflow-hidden flex gap-2 justify-center items-center'> 
                                {uploadPic?.name ? uploadPic.name : 'Click Here to Upload'} 
                                {uploadPic?.name ? '' : <FaRegImage />}
                            </p>
                            <button className='pl-1 pr-2' onClick={removePic}>
                                {uploadPic?.name && <IoClose className='rounded-xl hover:bg-red-500 text-white' />} 
                            </button>
                        </label>
                    
                        <input
                            ref={imageInputRef}
                            type='file' 
                            id='profile_pic'
                            name='profile_pic'
                            className='pl-2 pr-1 focus:outline-blue-600 rounded-md mt-1 w-72 hidden'
                            onChange={handleUploadPic}
                        />
                    </div>
                    <div className='flex justify-center items-center'>
                        <button id='glow-button' type='submit' className='bg-blue-400 px-5 py-2 h-11 w-40 rounded-xl mt-5 mb-2 hover:bg-green-500 hover:text-black font-sans text-lg font-medium text-white'>Sign Up</button> 
                    </div>
                </form>

                <p className='text-white my-2'>Already have an account? <Link to={'/login-email'} className='text-yellow-200 hover:text-green-400'> Login </Link> </p>
            </div>
        </div>
    )
}

export default SignUpPage; 