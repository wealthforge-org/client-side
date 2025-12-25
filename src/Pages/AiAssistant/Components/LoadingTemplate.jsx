import React from 'react'

const LoadingTemplate = () => {
    return (
        <div className="text-center py-10">
            <div className="spinner border-4 border-gray-200 border-t-[#667eea] rounded-full w-10 h-10 mx-auto mb-5"></div>
            <p>Loading cryptocurrency data...</p>
        </div>
    )
}

export default LoadingTemplate