import React from 'react'
import { IoChatboxEllipses } from "react-icons/io5"
import { FaUserPlus } from "react-icons/fa" 
import { BiLogOut } from "react-icons/bi"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux' 

import MiniAvatar from './MiniAvatar' 


const Sidebar = () => {
  
    const user = useSelector(state => state.user); 

    return (

        <div className='bg-zinc-700 w-full h-full'>

            <div className='bg-zinc-900 w-12 h-full rounded-tr-xl rounded-br-xl pt-8 pb-4 flex flex-col justify-between'> 
                <div className='flex flex-col gap-1.5'>
                    <NavLink className={ ({isActive}) => `tooltip w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-sky-500 rounded-tr-lg rounded-br-lg ${isActive && 'bg-green-400'}` }> 
                        <span className='tooltiptext'> Chats </span>
                        <IoChatboxEllipses 
                            className='text-white ml-3 mt-3.5'
                            size={22}
                        />
                    </NavLink>
                    <div className='tooltip w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-sky-500 rounded-tr-lg rounded-br-lg pl-0.5'>
                        <span className='tooltiptext'> Add Friend </span>
                        <FaUserPlus  
                            className='text-white ml-3 mt-3.5'
                            size={22}
                        />
                    </div>
                </div>

                <div>
                    <button className='miniavatartooltip'>
                        <span className='miniavatartooltiptext'>{user?.name}</span>
                        <MiniAvatar 
                            name = {user?.name}
                            secureImageURL = {user?.profile_pic}
                            height = {40}
                            width = {40}
                        />
                    </button>
                    <button className='tooltip w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-red-500 rounded-tr-lg rounded-br-lg pr-1.5'>
                        <span className='tooltiptext'> Logout </span>
                        <BiLogOut 
                            className='text-white ml-2'
                            size={22}
                        />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Sidebar