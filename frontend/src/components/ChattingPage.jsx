import React, { useEffect, useContext, useState } from 'react' 
import { useParams } from 'react-router-dom' 
import { SocketContext } from '../pages/Home' 
import MiniAvatar from './MiniAvatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";


const ChattingPage = () => {

	const user = useSelector(state => state.user); 

	const params = useParams(); 
	const socketConnection = useContext(SocketContext); 
	
	const [chatsReceivingUserData, setChatReceivingUserData] = useState({
		_id : '', 
		name : '', 
		email : '', 
		profile_pic : '', 
		online : false
	}); 

	useEffect( () => {
		if(socketConnection){
			socketConnection.emit('i-want-to-chat-with-this-user', params.userId); 
			socketConnection.on('chat-receiving-user-details', (data) => {
				setChatReceivingUserData(data); 
			}); 
		}
	}, [user, socketConnection, params?.userId]) 


	const [text, setText] = useState(''); 

	const handleTextChange = (e) => {
		setText(e.target.value); 
	}

	const sendText = (e) => {
		e.preventDefault(); 
		e.stopPropagation(); 
	}

	return (
		<div className='relative'>
			<header className='sticky top-0 h-16 bg-zinc-500 rounded-bl-2xl z-10 flex flex-row justify-between'>
				<div className='flex'> 
					<Link to={'/'} className='h-full w-8 justify-center items-center ml-3 flex lg:hidden'>
						<FaAngleLeft className='hover:text-green-500 text text-2xl' />
					</Link>
					<div className='flex h-full justify-center items-center ml-2 lg:ml-7'>
						<MiniAvatar 
							userId = {chatsReceivingUserData?._id} 
							name = {chatsReceivingUserData?.name}
							secureImageURL = {chatsReceivingUserData?.profile_pic}
							height = {50}
							width = {50}
						/>
					</div>
					<div className='h-full w-40 ml-5'>
						<h3 className='text-xl mt-1 text-white font-medium'> {chatsReceivingUserData.name} </h3>
						{
							chatsReceivingUserData.online 
							? 
								<p className='text-md text-green-400'> Online </p> 
							: 
								<p className='text-md text-black'> Offline </p> 
						}
					</div>
				</div>
				<div className='h-full w-8 flex justify-center items-center mr-3'>
					<button className='h-10 w-10 rounded-full'>
						<BsThreeDotsVertical className='hover:text-green-500 text text-2xl'/>
					</button>
				</div>
			</header>

			<section className='h-[calc(100vh-64px)] scrollbar rounded-tl-xl overflow-x-hidden overflow-y-hidden'>
				
			</section>
		
			<section className='h-12 bg-white absolute bottom-0 w-full'>
				<form onSubmit={sendText} className='flex h-full w-full bg-zinc-800 justify-center items-center'> 
					<input 
						className=' w-full my-2 ml-2 mr-1 bg-zinc-700 rounded-md pl-3 h-[35px] text-white'
						value={text}
						onChange={handleTextChange}
						placeholder='Type a message' 
						required
					/>
					<button type='submit' className='h-9 w-10 m-1 rounded-xl flex items-center justify-center'> 
						<IoSend className='text-xl text-white' />
					</button>
				</form>
			</section>
		</div>
	)
}

export default ChattingPage