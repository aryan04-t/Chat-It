import React from 'react'
import { useNavigate } from 'react-router-dom' 

import MiniAvatar from './MiniAvatar'


const UserCard = ({onClose, id, appUser}) => {

    const navigate = useNavigate(); 

    const selectedUser = (e) => {
        navigate(`/${appUser._id}`, {
            state : appUser
        }); 
        onClose(); 
    }    

    return (
        <div onClick={selectedUser} className='relative flex items-center gap-3 mt-1 bg-zinc-950 rounded-lg px-2 py-1.5 cursor-pointer hover:bg-green-600'> 
            <div className='mr-1'>
                <MiniAvatar 
                    name = {appUser?.name}
                    secureImageURL = {appUser?.profile_pic}
                    height = {50}
                    width = {50} 
                />
            </div>
            <div className='overflow-hidden'>
                <div className='font-semibold text-white'> 
                    {appUser?.name} 
                </div> 
                <p className='text-sm text-white'> {appUser?.email} </p> 
            </div> 
        </div> 
    )
}

export default UserCard 