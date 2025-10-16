import React from 'react'

const AiCards = ({
    icon,
    title,
    text
}) => {
    return (
        <div className="glass-card rounded-xl p-6 hover:border-purple-500/30 border border-gray-800 transition ">
            <div className="bg-purple-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <span className='className="w-6 h-6 text-purple-400"'>
                {icon}
            </span>
                
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-400">{text}</p>
        </div>
    )
}

export default AiCards


