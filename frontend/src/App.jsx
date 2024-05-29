import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster />
      <main className='bg-zinc-900 h-screen'>
        <Outlet /> 
      </main>
    </>
  )
}

export default App