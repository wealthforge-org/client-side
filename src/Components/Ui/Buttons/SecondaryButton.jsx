import React from 'react'

const SecondaryButton = ({text, className}) => {
  return (
    <button className={`px-4 py-2 border border-purple-600 text-purple-400 rounded-lg hover:bg-purple-900/30 transition ${className}`}>{text}</button>
  )
}

export default SecondaryButton
