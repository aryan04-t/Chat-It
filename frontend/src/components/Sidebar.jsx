import React, { useState } from 'react'
import { IoChatboxEllipses } from "react-icons/io5"
import { FaUserPlus } from "react-icons/fa" 
import { BiLogOut } from "react-icons/bi"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { IoArrowUndoSharp } from "react-icons/io5";

import MiniAvatar from './MiniAvatar' 
import EditUserDetails from './EditUserDetails'
import SearchUser from './SearchUser'
import intentionalLogoutOnUserRequest from '../helpers/intentionalLogoutOnUserRequest'


const Sidebar = () => {
  
    const user = useSelector(state => state.user); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    const [editUserOpen, setEditUserOpen] = useState(false); 
    const [searchUserOpen, setSearchUserOpen] = useState(false); 
    const [allUser, setAllUser] = useState([]); 

    const openEditUserDetailsTab = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        setEditUserOpen(true);
    }
    
    const closeEditUserDetailsTab = (e) => {
        setEditUserOpen(false);
    }
    
    const openUserSearchBar = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        setSearchUserOpen(true); 
    }

    const closeUserSearchBar = (e) => {
        setSearchUserOpen(false);     
    }

    const doLogout = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        intentionalLogoutOnUserRequest(dispatch);
        navigate('/login-email'); 
    }

    return (

        <div className='bg-zinc-700 w-full h-full grid grid-cols-[48px,1fr] lg:rounded-tr-2xl'>

            <div className='bg-zinc-900 w-12 h-full rounded-tr-xl pt-5 pb-2 flex flex-col justify-between'> 
                <div className='flex flex-col gap-1.5'>
                    <NavLink className={ ({isActive}) => `tooltip w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-sky-500 rounded-tr-lg rounded-br-lg ${isActive && 'bg-green-400'}` }> 
                        <span className='tooltiptext'> Chats </span>
                        <IoChatboxEllipses 
                            className='text-white ml-3 mt-3.5'
                            size={22}
                        />
                    </NavLink>
                    <div onClick={openUserSearchBar} className='tooltip w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-sky-500 rounded-tr-lg rounded-br-lg pl-0.5'>
                        <span className='tooltiptext'> Add Friend </span>
                        <FaUserPlus  
                            className='text-white ml-3 mt-3.5'
                            size={22}
                        />
                    </div>
                </div>

                <div>
                    <button className='miniavatartooltip' onClick={openEditUserDetailsTab}> 
                        <span style={{width : 'auto', whiteSpace : 'nowrap', padding : '5px', minWidth : '100px', backgroundColor : 'black'}} className='miniavatartooltiptext'> {user?.name} </span>
                        <MiniAvatar 
                            userId = {user?._id} 
                            name = {user?.name}
                            secureImageURL = {user?.profile_pic}
                            height = {40}
                            width = {40}
                        />
                    </button>
                    <button onClick={doLogout} className='tooltip w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-red-500 rounded-tr-lg rounded-br-lg pr-1.5 mt-2'>
                        <span className='tooltiptext'> Logout </span>
                        <BiLogOut 
                            className='text-white ml-2'
                            size={22}
                        />
                    </button>
                </div>
            </div>

            <div className='h-full w-full bg-transparent'>
                <div className='flex pl-8 font-serif items-center h-16 font-bold'>
                    <h1 className='text-xl font-semibold text-white pt-1 select-none'> Chats </h1>
                </div>
                <div className='bg-zinc-500 h-[calc(100vh-64px)] rounded-tr-2xl overflow-x-hidden overflow-y-auto scrollbar'>
                    {
                        allUser.length === 0 ? (
                            <div>
                                <div className='h-20 flex justify-center items-end rotate-12'>
                                    <IoArrowUndoSharp 
                                        size={50}
                                        className='text-zinc-900'
                                    />
                                </div>
                                <p className='text-lg font-serif text-white text-center mt-5 font-medium'>
                                    Explore users to start a <br/> conversation with. 
                                </p>
                            </div>
                        ) : (
                            allUser.map( (ele, key) => {
                                return(
                                    <div>
                                        
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>

            {/* Edit User Details Component */} 
            {
                editUserOpen && (
                    <EditUserDetails onClose={closeEditUserDetailsTab}  user={user} />
                )
            }

            {/* Search User */} 
            {
                searchUserOpen && (
                    <SearchUser onClose={closeUserSearchBar} user={user} /> 
                )
            }

        </div>
    )
}

export default Sidebar