import React from 'react'

const ErrorTemplate = ({ error, setError }) => {
    return (
        <div className="bg-red-50 border border-red-300 rounded-lg p-5 mb-5 text-center">
            <div className="text-red-700 font-medium mb-4">
                <span className="mr-2">⚠️</span>
                {error}
            </div>
            <button
                onClick={() => setError('')}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Dismiss
            </button>
        </div>
    )
}

export default ErrorTemplate