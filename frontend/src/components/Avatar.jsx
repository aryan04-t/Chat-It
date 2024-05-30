import React from "react"; 
import { FaUser } from "react-icons/fa";


const Avatar = ({name, secureImageURL, height, width}) => {

    let avatarName = ""; 

    if(name){
        const splitName = name.split(" "); 
        if(splitName.length > 1){
            avatarName = splitName[0][0] + splitName[1][0]; 
        }
        else{
            avatarName = splitName[0][0]; 
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

        <div className="flex flex-col justify-center items-center">
            {
                secureImageURL ? (
                    <img 
                        src={secureImageURL} 
                        alt="User Profile Pic" 
                        className='mt-4 mx-5 rounded-full overflow-hidden'
                        height={height}
                        width={width}
                    />
                ) : name ? (
                        <div className={`mt-4 p-5 overflow-hidden h-48 w-48 rounded-full text-8xl flex items-center justify-center font-serif ${randomBgColour[randomNumber]}`}>
                            {avatarName}
                        </div>
                    ) : (
                        <div className='mt-4 bg-white p-5 rounded-full'>
                            <FaUser className='text-8xl' />
                        </div>
                    )
            }
            <h1 className="text-center text-lg text-white mt-2 font-semibold">Welcome, {name ? name : "Anonymous"}</h1> 
        </div>
    )
} 


export default Avatar; 