import React from 'react'

import MiniAvatar from './MiniAvatar'


const UserCard = ({id, appUser}) => {
    return (
        <div className='relative flex items-center gap-3 mt-1 bg-zinc-950 rounded-lg px-2 py-1.5 cursor-pointer hover:bg-green-600'> 
            <div>
                <MiniAvatar 
                    name = {appUser?.name}
                    secureImageURL = {appUser?.profile_pic}
                    height = {40}
                    width = {40}
                    className='mb-0'
                />
            </div>
            <div>
                <div className='font-semibold text-white'> 
                    {appUser?.name} 
                </div> 
                <p className='text-sm text-white'> {appUser?.email} </p> 
            </div> 
        </div> 
    )
}

export default UserCard 