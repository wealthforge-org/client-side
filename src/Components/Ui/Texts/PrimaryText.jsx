import React from 'react'

const PrimaryText = ({
    text,
    className
}) => {
    return (
        <p className={`text-xl text-gray-300 ${className}`}>
            {text}
        </p>
    )
}

export default PrimaryText
