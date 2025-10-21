import React from 'react'

const Searchbar = ({
    placeholder,
    value,
    onChange,
    className
}) => {
    return (
        <div className="max-w-md mx-auto">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent ${className}`}
            />
        </div>
    )
}

export default Searchbar
