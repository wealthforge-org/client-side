import React from 'react'
import { Activity } from "lucide-react"

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <Activity className="text-purple-500"/>
            <span className="text-xl font-bold gradient-text">WealthForge</span>
        </div>
    )
}

export default Logo
