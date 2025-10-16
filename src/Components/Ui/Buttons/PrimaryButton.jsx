import React from 'react'
import { Link } from 'react-router-dom'

const PrimaryButton = ({text, className, to, icon}) => {
  return (
    <Link to={to} className={`px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:opacity-90 transition ${className}`}>
        {text}
    </Link>
  )
}

export default PrimaryButton
