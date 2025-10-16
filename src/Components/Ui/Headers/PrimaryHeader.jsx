import React from 'react'

const PrimaryHeader = ({
    children,
    className
}) => {
  return (
    <h1 className={`text-5xl font-bold leading-tight ${className}`}>
      {children}
    </h1>
  )
}

export default PrimaryHeader
