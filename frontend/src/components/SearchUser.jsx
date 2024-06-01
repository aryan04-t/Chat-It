import React, { useRef, useState, useEffect } from 'react' 
import { IoClose } from "react-icons/io5"
import { FaSearch } from "react-icons/fa" 
import axios from 'axios'
import toast from 'react-hot-toast'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import UserCard from './UserCard.jsx' 


const SearchUser = ({onClose, user}) => {

	const dispatch = useDispatch(); 
	const navigate = useNavigate(); 

    const [searchQuery, setSearchQuery] = useState(''); 
    const [userSearchResult, setUserSearchResult] = useState([]); 

    const [loading, setLoading] = useState(false); 
    const [searchResultIsHidden, setSearchResultIsHidden] = useState(true); 
    const [searchDone, setSearchDone] = useState(false); 

    const searchBarCardRef = useRef(); 
    const searchResultContainerRef = useRef(); 
    
    useEffect( () => {
        const handler = (e) => {
            e.stopPropagation();
            if(!searchBarCardRef.current.contains(e.target) && !searchResultContainerRef.current.contains(e.target)){
                onClose(); 
            }
        }
        document.addEventListener('mousedown', handler); 
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    })

    const onSubmitSearchDatabase = async (e) => {

        setLoading(true); 

        e.preventDefault(); 
        e.stopPropagation(); 

        axios({ 
            method : 'put', 
            url : `${import.meta.env.VITE_BACKEND_URL}/api/user/get-user-search-result`, 
            data : {searchQuery}, 
            withCredentials : true 
        })
        .then( (response) => {
            if(response?.data?.success){
                setUserSearchResult(response?.data?.data);
                setSearchDone(true); 
                setLoading(false);
                setSearchResultIsHidden(false);
            }
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
    
    
    const searchDatabaseConstantly = async () => {

        if(searchQuery === '') return;

        setLoading(true); 

        axios({ 
            method : 'put', 
            url : `${import.meta.env.VITE_BACKEND_URL}/api/user/get-user-search-result`, 
            data : {searchQuery}, 
            withCredentials : true 
        })
        .then( (response) => {
            if(response?.data?.success){
                setUserSearchResult(response?.data?.data);
                setSearchDone(true); 
                setLoading(false);
                setSearchResultIsHidden(false);
            }
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


    useEffect( () => {
        searchDatabaseConstantly();  
    }, [searchQuery])


    const closeSearchResult = (e) => {
        setSearchResultIsHidden(true); 
        setSearchDone(false);
    }


    return (
        <>
            <div id='search-user-bar-container' className='fixed centered-search-bar-around w-full max-w-sm z-10'>
                <div className='relative w-[95%] max-w-sm mx-[2.5%] bg-zinc-700 mt-5 p-5 rounded-2xl' ref={searchBarCardRef}>
                    
                    <label htmlFor='search-bar' className='text-lg text-yellow-200 font-sans mx-2 cursor-pointer select-none'> Search User </label> 

                    <div className='absolute top-0 right-0 w-10 h-10 flex justify-end'>
                        <button className='ml-1 mr-2 mt-2 h-5 w-5 rounded-xl flex justify-center items-center' onClick={onClose}>
                            <IoClose className='rounded-xl hover:bg-red-500 text-white text-lg' /> 
                        </button>
                    </div>
                    
                    <form className='flex mt-3' onSubmit={onSubmitSearchDatabase}>
                        <input
                            type='text' 
                            id='search-bar' 
                            placeholder='Search user by name, email...'
                            value={searchQuery} 
                            onChange={ (e) => setSearchQuery(e.target.value) }
                            required
                            className='w-full outline-none py-[4.6px] h-full pl-4 pr-8 rounded-full text-white bg-zinc-950' 
                        />
                        <button type='submit' className='-ml-[30px] mt-[1.2px] text-white hover:text-green-500 w-7 h-7 flex justify-center items-center rounded-full'>
                            {
                                loading ? (
                                    <div role="status">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                ) : (
                                    <FaSearch />
                                )
                            }
                        </button> 
                    </form>
                </div>
            
                {/* Display Search Results */} 
                <div id='search-result-container' className={`${searchResultIsHidden && 'hidden'} w-full max-w-sm fixed centered-search-results-around -mt-3 z-10`} ref={searchResultContainerRef}> 

                    <div className='w-[82%] mx-[9%] bg-transparent rounded-t-xl rounded-b-xl flex flex-col gap-1 min-h-0 max-h-40 overflow-x-auto scroll-smooth scrollbar'>
                        
                        {
                            userSearchResult.length === 0 && searchDone && (
                                <>
                                    <p className='text-white px-4 py-2 text-sm rounded-lg cursor-pointer bg-red-500 flex relative'> 
                                        No User Found 
                                        <button className='pl-1 absolute h-3.5 w-3.5 rounded-bl-lg top-0 right-0' onClick={ closeSearchResult } > 
                                            <IoClose className='rounded-bl-lg text-white text-sm absolute top-[0.3px] right-[0.2px] bg-zinc-800 hover:bg-black' /> 
                                        </button>
                                    </p> 
                                </> 
                            ) 
                        }

                        {
                            userSearchResult.length !== 0 && searchDone && (
                                
                                <>
                                    <button className='pl-1 absolute h-3.5 w-3.5 rounded-bl-lg rounded-tr-lg top-0 right-0 mr-[35px] mt-[0.5px] z-20' onClick={ closeSearchResult } > 
                                        <IoClose className='rounded-bl-lg rounded-tr-lg text-black text-sm absolute top-0 right-0 bg-zinc-300 hover:bg-red-500' /> 
                                    </button>
                                    <p className='text-white px-4 py-2 text-sm rounded-lg cursor-pointer flex relative bg-zinc-950 hover:bg-green-600'> 
                                        {userSearchResult[0].name}
                                    </p> 

                                    {
                                        userSearchResult.map( (appUser, index) => {
                                            if(index == 0) return;
                                            return(
                                                <UserCard key={appUser._id} appUser={appUser}/>
                                            )
                                        })
                                    }
                                </>
                            )
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default SearchUser