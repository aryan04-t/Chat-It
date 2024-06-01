import React from 'react'

const UserCard = ({id, appUser}) => {
    return (
        <p className='text-white px-4 py-2 text-sm rounded-lg cursor-pointer bg-zinc-950 hover:bg-green-600'> 
            {appUser.name}
        </p>
    )
}

export default UserCard 