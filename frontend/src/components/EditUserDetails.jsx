import React, { useState, useRef, useEffect } from 'react'
import { IoClose } from "react-icons/io5"
import { FaRegImage } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

import { useDispatch } from 'react-redux'
import { setUser, setProfilePicPublicId, logout } from '../redux/userSlice'

import uploadFile from '../helpers/uploadFile' 
import MiniAvatar from './MiniAvatar' 
import validateInputFields from '../helpers/validateInputFields'


const EditUserDetails = ({onClose, user}) => {

    const imageInputRef = useRef();	
	const dispatch = useDispatch(); 
	const navigate = useNavigate(); 

	const [data, setData] = useState({
		name : user?.name, 
		profile_pic : user?.profile_pic,
		cloudinary_img_public_id : user?.cloudinary_img_public_id  
	})

    const [uploadPic, setUploadPic] = useState({});  
    const [cloudinaryImgPublicID, setCloudinaryImgPublicID] = useState(''); 
	
	const [imageUploadLoading, setImageUploadLoading] = useState(false); 
	
	const handleUploadPic = async (e) => {
		e.preventDefault(); 
        e.stopPropagation(); 

        setImageUploadLoading(true); 
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
			
            setImageUploadLoading(false); 
        }
        catch(err){
			toast.error(err?.response?.data?.message); 
            setImageUploadLoading(false); 
            console.log(err); 
        }
    }

	const [imageDeletionLoading, setImageDeletionLoading] = useState(false); 
	
	const removePic = async (e) => {
		e.preventDefault();
        e.stopPropagation(); 
		
		setImageDeletionLoading(true);

        if(data.profile_pic !== user?.profile_pic){
            imageInputRef.current.value = ''; 
            setUploadPic({});
            setData({
                ...data,
                profile_pic : user?.profile_pic,
				cloudinary_img_public_id : user?.cloudinary_img_public_id 
            })
        }

        try{
            if(cloudinaryImgPublicID !== ''){
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/delete-cloudinary-asset`, {
                    public_id : cloudinaryImgPublicID
                })
                setCloudinaryImgPublicID(''); 
                toast.success(response?.data?.message); 
				setImageDeletionLoading(false);
            }
        }
        catch(err){
            toast.error(err?.response?.data?.message); 
			setImageDeletionLoading(false);
            console.log(`Error occured while calling api for deleting cloudinary asset: ${err}`); 
        }
    }

	const [loadingForUpdatesHappening, setLoadingForUpdatesHappening] = useState(false); 

	const handleFormSubmission = (e) => {
        e.preventDefault();
        e.stopPropagation(); 

		if(user?.name === data?.name && user?.profile_pic === data?.profile_pic){
			toast.error('Please provide some new details for updating your profile');
			toast.error('Your current given input matches with your already existing details');
			return; 
		}

		setLoadingForUpdatesHappening(true); 

		axios({
			method : 'put', 
			url : `${import.meta.env.VITE_BACKEND_URL}/api/user/update`,
			data, 
			withCredentials : true 
		})
		.then( (response) => {

			const oldPicPublicId = user.profile_pic_public_id; 

			let userDidntHaveAProfilePicEarlierAndOrTheyHaventUploadedNewOne = false; 

			if(oldPicPublicId !== '' && cloudinaryImgPublicID !== ''){
				axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/delete-cloudinary-asset`, {
					public_id : oldPicPublicId
				})
				.then( (response) => {
					toast.success('Old profile pic deleted successfully');		
					setLoadingForUpdatesHappening(false); 		
					onClose();  
				})
				.catch( (err) => {
					toast.error('Error occured while deleting old profile pic'); 
					console.log(`Error occured while calling api for deleting cloudinary asset: ${err}`); 
					setLoadingForUpdatesHappening(false); 		
					onClose();  
				}) 
			}
			else{
				userDidntHaveAProfilePicEarlierAndOrTheyHaventUploadedNewOne = true; 
			}

			if(cloudinaryImgPublicID !== ''){
				dispatch(setProfilePicPublicId(cloudinaryImgPublicID)); 
			}
			dispatch(setUser(response?.data?.data)); 

			toast.success(response?.data?.message); 

			if(userDidntHaveAProfilePicEarlierAndOrTheyHaventUploadedNewOne){
				setLoadingForUpdatesHappening(false); 
				onClose(); 
			}
		}) 
		.catch( (err) => {
			console.log(err); 
			toast.error(err?.response?.data?.message); 
			setLoadingForUpdatesHappening(false);
			onClose(); 
			if(err?.response?.data?.logout){
				dispatch(logout()); 
				navigate('/login-email'); 
			}
		})
    }


    const [isNameErrorTextInvisible, setIsNameErrorTextInvisible] = useState(true);  
    const [nameErrorText, setNameErrorText] = useState('Display Name Error Text'); 
	
	const handleChange = (e) => {
		const {name, value} = e.target; 
		setData({...data, [name] : value }); 
		if(name === 'name'){
			validateInputFields('name', value, {
				setIsNameErrorTextInvisible,
				setNameErrorText 
			}); 
		}
	}

	
    const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(true); 

    useEffect( () => {
        if(!imageUploadLoading && !imageDeletionLoading && !loadingForUpdatesHappening && isNameErrorTextInvisible){
            setIsUpdateButtonDisabled(false); 
        }
        else{
            setIsUpdateButtonDisabled(true); 
        }
    }, [imageUploadLoading, imageDeletionLoading, loadingForUpdatesHappening, isNameErrorTextInvisible]); 

		
	const updateUserDetailsCardRef = useRef(); 
    
    useEffect( () => {
        
        const handler = (e) => {
			if(!updateUserDetailsCardRef.current.contains(e.target)){
				if(!imageUploadLoading && !imageDeletionLoading && !loadingForUpdatesHappening){
					onClose(); 
				}
				else if(imageUploadLoading){
					toast.error('You cannot close "Edit Profile Details" tab when new profile pic is being uploaded'); 
				}
				else if(imageDeletionLoading){
					toast.error('You cannot close "Edit Profile Details" tab when new profile pic is being removed'); 
				}
				else if(loadingForUpdatesHappening){
					toast.error('You cannot close "Edit Profile Details" tab when new updates are being made'); 
				}
			}
        }

        document.addEventListener('mousedown', handler); 

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    })


	const closeUpdatesTab = () => {
		if(!imageUploadLoading && !imageDeletionLoading && !loadingForUpdatesHappening){
			onClose(); 
		}
		else if(imageUploadLoading){
			toast.error('You cannot close "Edit Profile Details" tab when new profile pic is being uploaded'); 
		}
		else if(imageDeletionLoading){
			toast.error('You cannot close "Edit Profile Details" tab when new profile pic is being removed'); 
		}
		else if(loadingForUpdatesHappening){
			toast.error('You cannot close "Edit Profile Details" tab when new updates are being made'); 
		}
	}


  	return (
		<div id='update-user-details-card' ref={updateUserDetailsCardRef} className='fixed centered-axis-xy flex justify-center items-center select-none rounded-2xl z-10' > 
			<div className='bg-zinc-800 w-full max-w-[400px] rounded-2xl overflow-hidden p-2 flex flex-col justify-center items-center'>

				<div className='w-full flex justify-end'>
					<button className='ml-1 mr-2' onClick={closeUpdatesTab}>
						<IoClose className='rounded-xl hover:bg-red-500 text-white text-lg' /> 
					</button>
				</div>

				<h1 className='text-3xl text-yellow-200 font-serif mt-5'> Edit Profile Details: </h1>

				<form className='grid mt-7' onSubmit={handleFormSubmission}> 
					
					<div className='flex flex-col gap-1'>
						<label htmlFor='name'  className='text-lg text-white font-sans mx-2 cursor-pointer'> Name: </label>
						<input 
							disabled={loadingForUpdatesHappening}
							type='text' 
							name='name' 
							id='name' 
							value={data.name} 
							placeholder='Enter your new name here' 
							onChange={handleChange} 
							className='px-2 py-1 focus:outline-blue-600 rounded-md mt-1 mx-2 w-72'
							required
						/>
						<p className={ 'text-[10px] text-red-500 px-2 font-mono rounded-md mt-1 mx-2 w-72 ' + `${isNameErrorTextInvisible && 'invisible'}`}> {nameErrorText} </p>
					</div>
					
					<div className='flex flex-col gap-1 mb-5 mt-3'>
						<p className='text-lg text-white font-sans mx-2'> Profile Pic: </p>
						
						<div className='flex items-center mx-1.5'>
							<MiniAvatar 
								name = {data?.name}
								secureImageURL = {data?.profile_pic}
								height = {48}
								width = {48}
								/>

							<label htmlFor='profile_pic' className='file-upload-label h-14 w-56 max-w-56 bg-slate-600 rounded-xl mt-0.5 border-2 border-slate-600 hover:border-blue-400 flex justify-center items-center cursor-pointer ml-3'>
								{
									(imageUploadLoading || imageDeletionLoading) && 
									<div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-2 border-t-blue-600" />
								}
								{
									(!imageUploadLoading && !imageDeletionLoading) && 
									<>
										<p className='text-sm text-white font-sans max-width-[260] pl-3 overflow-hidden flex gap-2 justify-center items-center'> 
											{uploadPic?.name ? uploadPic.name : 'Upload New Pic'} 
											{uploadPic?.name ? '' : <FaRegImage />}
										</p>
										{uploadPic?.name && 
											<button disabled={loadingForUpdatesHappening} className={`pl-1 pr-2 ${loadingForUpdatesHappening ? 'invisible' : 'visible'}`} onClick={removePic}>
												<IoClose className='rounded-xl hover:bg-red-500 text-white' /> 
											</button>
										}
									</>
								}
							</label>

							<input
								disabled={loadingForUpdatesHappening || imageDeletionLoading || imageUploadLoading || (cloudinaryImgPublicID !== '')}
								ref={imageInputRef}
								type='file' 
								id='profile_pic'
								name='profile_pic'
								className='hidden'
								onChange={handleUploadPic}
							/>
						</div>
					</div>

					<div className='flex items-center justify-center'>
                        <button disabled={isUpdateButtonDisabled} type='submit' className={`${isUpdateButtonDisabled ? 'bg-red-400' : 'glow-button bg-blue-400 hover:bg-green-500 hover:text-black'} font-medium text-white font-sans text-lg px-5 py-2 h-19 w-40 rounded-xl mt-6 mb-4 flex justify-center items-center`}> 
							{
								loadingForUpdatesHappening && 
								<div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-2 border-t-blue-600" />
							}
							{
								!loadingForUpdatesHappening && 
								<p>
									Update 
								</p>
							}
						</button> 
                    </div>
				</form>
			</div>
		</div>
  	)
} 

export default React.memo(EditUserDetails) 