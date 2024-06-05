import React from "react"; 
import { FaUser } from "react-icons/fa";


const MiniAvatar = ({name, secureImageURL, height, width}) => {

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

    return(

        <>
            {
                secureImageURL ? (
                    <div style={{ height : `${height}px`, width : `${width}px` }} >
                        <img 
                            src={secureImageURL} 
                            alt="User Profile Pic" 
                            className='ml-1 rounded-full overflow select-none'
                            height={height}
                            width={width}
                        />
                    </div>
                ) : name ? (
                        <div style={{ height : `${height}px`, width : `${width}px` }} className={`ml-1 overflow-hidden flex justify-center items-center rounded-full cursor-pointer select-none text-md font-serif ${randomBgColour[randomNumber]}`}>
                            {miniAvatarName}
                        </div>
                    ) : (
                        <FaUser className='text-4xl border-white border-4 ml-[5.5px] mb-2 bg-white rounded-full select-none' />
                    )
            }
        </>
    )
} 


export default MiniAvatar; 