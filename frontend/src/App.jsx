import React from 'react'
import { Outlet } from 'react-router-dom'


const App = () => {
  return (
    <>
      <main className='bg-zinc-900 min-h-screen'>
        <Outlet /> 
      </main>
    </>
  )
}

export default App