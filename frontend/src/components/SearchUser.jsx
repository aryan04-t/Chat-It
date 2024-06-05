import React, { useRef, useState, useEffect } from 'react' 
import { IoClose } from "react-icons/io5"
import { FaSearch } from "react-icons/fa" 
import axios from 'axios'
import toast from 'react-hot-toast'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import SearchResultUserCard from './SearchResultUserCard.jsx' 
import LoadingSpinner from './LoadingSpinner.jsx'
import sessionTimeOutLogout from '../helpers/sessionTimeOutLogout.js'
import securityLogout from '../helpers/securityLogout.js'


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
        if(!localStorage.getItem('jwt')){ 
			toast.error("Security Logout"); 
			securityLogout(dispatch); 
			navigate('/login-email'); 
		}
		else{
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
        }
    })

    const onSubmitSearchDatabase = (e) => {

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
            else{
                setLoading(false);
                toast.error('Internal Server Error, Search was Unsuccessfull'); 
            }
        })
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            setLoading(false);
            console.log(err); 
			if(err?.response?.data?.logout){
				sessionTimeOutLogout(dispatch); 
				navigate('/login-email'); 
			}
        })
    }
    
    
    const searchDatabaseConstantly = () => {

        if(searchQuery === ''){
            setSearchDone(false); 
            setSearchResultIsHidden(true); 
            return;
        }

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
            setLoading(false); 
            console.log(err); 
			if(err?.response?.data?.logout){
				sessionTimeOutLogout(dispatch); 
				navigate('/login-email'); 
			}
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
        <div className='fixed h-full w-full bg-transparent'>
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
                                    <LoadingSpinner height={5} width={5} />
                                ) : (
                                    <FaSearch />
                                )
                            }
                        </button> 
                    </form>
                </div>
            
                {/* Display Search Results */} 
                <div id='search-result-container' className={`${searchResultIsHidden && 'hidden'} w-full max-w-sm fixed centered-search-results-around -mt-3 z-10`} ref={searchResultContainerRef}> 

                    <div className='w-[82%] mx-[9%] bg-transparent rounded-t-xl rounded-b-xl flex flex-col gap-1 min-h-0 max-h-80 overflow-x-auto scroll-smooth scrollbar'>
                        
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
                                        <IoClose className='rounded-bl-lg rounded-tr-lg text-black text-sm absolute top-0 right-0 bg-zinc-300 hover:bg-red-500 cursor-pointer' /> 
                                    </button>

                                    {
                                        userSearchResult.map( (appUser, index) => {
                                            return(
                                                <SearchResultUserCard onClose={onClose} key={appUser._id} appUser={appUser}/>
                                            )
                                        })
                                    }
                                </>
                            )
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchUser