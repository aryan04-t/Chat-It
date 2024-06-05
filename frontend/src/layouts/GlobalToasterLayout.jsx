import React from 'react'
import { Toaster } from 'react-hot-toast';


const GlobalToasterLayout = ({children}) => {
    return (
        <>
            <Toaster />     
            {children}
        </>
    )
}

export default GlobalToasterLayout