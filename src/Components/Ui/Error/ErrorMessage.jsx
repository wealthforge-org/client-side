import React from 'react'

const ErrorMessage = ({
  message,
  onClick,
  error,
  children
}) => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">{message}</h2>
          <p className="mb-6">{error}</p>
          <button 
            onClick={onClick}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors curser-pointer"
          >
            Retry
            {children}
          </button>
        </div>
      </div>
    </>
  )
}

export default ErrorMessage
