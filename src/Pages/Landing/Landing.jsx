import React from 'react'
import Hero from "./Components/Hero/Hero"
import AiInfoSection from './Components/Hero/Components/AiInfoSection'
import SecondaryHeader from '../../Components/Ui/Headers/SecondaryHeader'

const Landing = () => {
  return (
    <div>
      <Hero />
      <div className='flex items-center flex-col'>
        <SecondaryHeader title={"AI-Powered Investment Tools"}/>
        <p className="text-gray-400 max-w-2xl mx-auto">Our platform combines cutting-edge machine learning with financial expertise to give you the edge in today's volatile markets.</p>
        <AiInfoSection/>
      </div>
    </div>
  )
}

export default Landing
