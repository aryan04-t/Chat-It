import React from 'react' 

const LoadingSpinner = ({height, width}) => {
    return (
        <div className={`border-gray-300 h-${height} w-${width} animate-spin rounded-full border-2 border-t-blue-600`} /> 
    )
}

export default LoadingSpinner