import React from "react"; 
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";


const MiniAvatar = ({userId, name, secureImageURL, height, width}) => {

    const currOnlineUsers = useSelector(state => state?.user?.onlineUsers); 

    let miniAvatarName = ""; 

    if(name){
        const splitName = name.split(" "); 
        if(splitName.length > 1 && splitName[1] !== ''){
            miniAvatarName = splitName[0][0] + splitName[1][0]; 
        }
        else{
            miniAvatarName = splitName[0][0]; 
        }
    }

    const randomBgColour = [
        'bg-sky-400',
        'bg-lime-400',
        'bg-green-400',
        'bg-emerald-400',
        'bg-purple-400', 
        'bg-blue-400', 
        'bg-red-400',
        'bg-orange-400',
        'bg-yellow-400',
    ]

    const randomNumber = Math.floor(Math.random() * 5);

    const isOnline = currOnlineUsers.includes(userId); 

    return(

        <>
            {
                secureImageURL ? (
                    <div style={{ height : `${height}px`, width : `${width}px` }} className='relative ml-1' >
                        <img 
                            src={secureImageURL} 
                            alt="User Profile Pic" 
                            className='rounded-full overflow select-none'
                            height={height}
                            width={width}
                        />
                        {
                            isOnline && 
                                <div className='bg-green-500 absolute p-1 rounded-full bottom-[4px] right-[1px]'></div>
                        }
                    </div>
                ) : name ? (
                        <div style={{ height : `${height}px`, width : `${width}px` }} className={`relative ml-1 flex justify-center items-center rounded-full cursor-pointer select-none text-md font-serif ${randomBgColour[randomNumber]}`}>
                            {miniAvatarName}
                            {
                                isOnline && <div className='bg-green-500 absolute p-1 rounded-full bottom-[4px] right-[1px]'></div>
                            }
                        </div>
                    ) : (
                        <FaUser style={{ height : `${height}px`, width : `${width}px` }} className='text-4xl border-white border-4 ml-[5.5px] bg-white rounded-full select-none' />
                    )
            }
        </>
    )
} 


export default MiniAvatar; 