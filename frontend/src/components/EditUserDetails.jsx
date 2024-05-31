import React, { useRef } from 'react'
import { useState } from 'react' 
import { IoClose } from "react-icons/io5"
import { FaRegImage } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

import { useDispatch } from 'react-redux'
import { setUser, setProfilePicPublicId, logout } from '../redux/userSlice'

import uploadFile from '../helpers/uploadFile';
import MiniAvatar from './MiniAvatar' 


const EditUserDetails = ({onClose, user}) => {
	
    const imageInputRef = useRef();	
	const dispatch = useDispatch(); 
	const navigate = useNavigate(); 

	const [data, setData] = useState({
		name : user?.name, 
		profile_pic : user?.profile_pic  
	})

	const handleChange = (e) => {
		const {name, value} = e.target; 
		setData({
			...data, 
			[name] : value 
		})
	}

    const [uploadPic, setUploadPic] = useState({});  
    const [cloudinaryImgPublicID, setCloudinaryImgPublicID] = useState(''); 

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
                profile_pic : user?.profile_pic 
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

		if(user?.name == data?.name && user?.profile_pic == data?.profile_pic){
			toast.error('Please provide some new details for updating your profile');
			toast.error('your current given input matches with your already existing details');
			return; 
		}

		axios({
			method : 'put', 
			url : `${import.meta.env.VITE_BACKEND_URL}/api/user/update`,
			data, 
			withCredentials : true 
		})
		.then( (response) => {

			const oldPicPublicId = user.profile_pic_public_id; 

			if(oldPicPublicId !== '' && cloudinaryImgPublicID !== ''){
				axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/delete-cloudinary-asset`, {
					public_id : oldPicPublicId
				})
				.then( (response) => {
					toast.success('Old profile pic deleted successfully'); 
				})
				.catch( (err) => {
					toast.error('Error occured while deleting old profile pic'); 
					console.log(`Error occured while calling api for deleting cloudinary asset: ${err}`); 
				}) 
			}

			if(cloudinaryImgPublicID !== ''){
				dispatch(setProfilePicPublicId(cloudinaryImgPublicID)); 
			}
			dispatch(setUser(response?.data?.data)); 

			imageInputRef.current.value = ''; 
            setUploadPic({});
            setData({
                name : user?.name,
                profile_pic : user?.profile_pic 
            });   
            setCloudinaryImgPublicID(''); 

			toast.success(response?.data?.message); 

			onClose(); 
		}) 
		.catch( (err) => {
			toast.error(err?.response?.data?.message); 
			if(err?.response?.data?.logout){
				dispatch(logout()); 
				navigate('/login-email'); 
			}
			console.log(err); 
		})
    }

  	return (
		<div className='fixed top-0 bottom-0 left-0 right-0 bg-white bg-opacity-40 flex justify-center items-center select-none'> 
			<div className='bg-zinc-800 w-full max-w-[400px] rounded-2xl overflow-hidden p-4 flex flex-col justify-center items-center mx-5'>

				<div className='w-full flex justify-end'>
					<button className='pl-1 pr-2' onClick={onClose}>
						<IoClose className='rounded-xl hover:bg-red-500 text-white text-lg' /> 
					</button>
				</div>

				<h1 className='text-3xl text-yellow-200 font-serif mt-5'> Edit Profile Details: </h1>

				<form className='grid gap-7 mt-7' onSubmit={handleFormSubmission}> 
					
					<div className='flex flex-col gap-1'>
						<label htmlFor='name'  className='text-lg text-white font-sans mx-2 cursor-pointer'> Name: </label>
						<input 
							type='text' 
							name='name' 
							id='name' 
							value={data.name} 
							placeholder='Enter your new name here' 
							onChange={handleChange} 
							className='px-2 py-1 focus:outline-blue-600 rounded-md mt-1 mx-2 w-72'
							required
						/>
					</div>
					
					<div className='flex flex-col gap-1 mb-5'>
						<p className='text-lg text-white font-sans mx-2'> Profile Pic: </p>
						
						<div className='flex items-center mx-1.5'>
							<MiniAvatar 
								name = {data?.name}
								secureImageURL = {data?.profile_pic}
								height = {50}
								width = {50}
							/>

							<label htmlFor='profile_pic' className='file-upload-label h-14 w-56 max-w-56 bg-slate-600 rounded-xl mt-0.5 border-2 border-slate-600 hover:border-blue-400 flex justify-center items-center cursor-pointer ml-3'>
								<p className='text-sm text-white font-sans max-width-[260] pl-3 overflow-hidden flex gap-2 justify-center items-center'> 
									{uploadPic?.name ? uploadPic.name : 'Upload New Pic'} 
									{uploadPic?.name ? '' : <FaRegImage />}
								</p>
								{uploadPic?.name && 
									<button className='pl-1 pr-2' onClick={removePic}>
										<IoClose className='rounded-xl hover:bg-red-500 text-white' /> 
									</button>
								}
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
					</div>

					<div className='flex items-center ml-16'>
                        <button type='submit' className='glow-button bg-blue-400 px-5 py-2 h-19 w-40 rounded-xl mb-4 hover:bg-green-500 hover:text-black font-sans text-lg font-medium text-white'>Save</button> 
                    </div>
				</form>
			</div>
		</div>
  	)
} 

export default React.memo(EditUserDetails) 