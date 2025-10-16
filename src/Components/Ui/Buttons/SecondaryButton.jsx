import React from 'react'
import { Link } from 'react-router-dom'

const SecondaryButton = ({text, className, to}) => {
  return (
    <Link to={to} className={`px-4 py-2 border border-purple-600 text-purple-400 rounded-lg hover:bg-purple-900/30 transition ${className}`}>{text}</Link>
  )
}

export default SecondaryButton
