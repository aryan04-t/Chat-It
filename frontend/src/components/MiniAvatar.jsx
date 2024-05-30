import React from "react"; 
import { FaUser } from "react-icons/fa";


const MiniAvatar = ({name, secureImageURL, height, width}) => {

    let miniAvatarName = ""; 

    if(name){
        const splitName = name.split(" "); 
        if(splitName.length > 1){
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
    ]

    const randomNumber = Math.floor(Math.random() * 5);

    return(

        <>
            {
                secureImageURL ? (
                    <img 
                        src={secureImageURL} 
                        alt="User Profile Pic" 
                        className='ml-1 rounded-full overflow-hidden'
                        height={height}
                        width={width}
                    />
                ) : name ? (
                        <div className={`ml-1 mb-2 overflow-hidden h-10 w-10 rounded-full text-md flex items-center justify-center font-serif cursor-pointer ${randomBgColour[randomNumber]}`}>
                            {miniAvatarName}
                        </div>
                    ) : (
                        <FaUser className='text-4xl border-white border-4 ml-[5.5px] mb-2 bg-white rounded-full' />
                    )
            }
        </>
    )
} 


export default MiniAvatar; 