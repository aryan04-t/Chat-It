import React from 'react'
import logo from '../assets/logo.png';


const AuthLayout = ({children}) => {
  return (
    <>  
      <header className="flex justify-center items-center py-3 h-[71px] shadow-md shadow-zinc-800 select-none bg-zinc-900">
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
      <section className='bg-zinc-900 min-h-[calc(100vh-71px)]'>
        {children}
      </section>
    </>
  )
}

export default AuthLayout