import React from 'react'

const PrimaryButton = ({text, className}) => {
  return (
    <button className={`px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:opacity-90 transition ${className}`}>
        {text}
    </button>
  )
}

export default PrimaryButton
