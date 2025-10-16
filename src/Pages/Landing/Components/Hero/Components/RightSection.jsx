import React from 'react'
import { TrendingUp } from 'lucide-react';

const RightSection = () => {
    return (
        <div className="glass-card rounded-2xl p-1">
            <div className="bg-gray-800/50 rounded-xl p-6">
                <div className='flex justify-between flex-col pb-4 border-b border-gray-700 '>
                    <div className='text-left'>
                        <p className="text-gray-400">Portfolio Value</p>
                        <p className="text-3xl font-bold">$24,382.45</p>
                        <p className="text-green-400 text-sm flex items-center">
                            <TrendingUp />
                            12.5% (24h)
                        </p>
                        <hr className='text-gray-700 mt-2' />
                    </div>
                    <div className="py-6">
                        <div className='flex justify-between items-center mb-2'>
                            <p className='font-medium'>AI Prediction Score</p>
                            <p className="text-purple-400 font-medium">87/100</p>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full"
                                style={{ width: '87%' }}
                            ></div>
                            <p className="text-sm text-gray-400 mt-1">
                                Market conditions favorable for buying
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-10">
                            <div className="bg-gray-700/50 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-400 text-left">BTC</p>
                                        <p className="font-bold">$42,156.34</p>
                                        <p className="text-green-400 text-xs flex items-center">
                                            <TrendingUp />
                                            5.2%
                                        </p>
                                    </div>
                                    <i data-feather="bitcoin" className="w-6 h-6 text-orange-500"></i>
                                </div>
                            </div>
                            <div className="bg-gray-700/50 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-400 text-left">ETH</p>
                                        <p className="font-bold">$2,345.67</p>
                                        <p className="text-green-400 text-xs flex items-center">
                                            <TrendingUp />
                                            3.8%
                                        </p>
                                    </div>
                                    <i data-feather="database" className="w-6 h-6 text-blue-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSection
