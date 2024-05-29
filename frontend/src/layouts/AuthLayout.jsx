import React from 'react'
import logo from '../assets/logo.png';

const AuthLayout = ({children}) => {
  return (
    <>  
      <header className="flex justify-center items-center py-3 h-23 shadow-md select-none">
        <img 
          className='rounded-2xl'
          src={logo}
          alt='logo'
          width={60}
          height={60} 
        />
        <p className='text-blue-400 text-[1.5em] px-4 font-serif'>
          ChatIt
        </p>
      </header>
      
      {children}
    </>
  )
}

export default AuthLayout