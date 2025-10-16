import React from 'react'
import RightSection from './Components/RightSection'
import LeftSection from './Components/LeftSection'

const Hero = () => {
  return (
    <div className='max-w-7xl mx-auto px-6 py-16'>
        <section className='grid md:grid-cols-2 gap-12 items-center'>
            <LeftSection/>
            <RightSection/>
        </section>
    </div>
  )
}

export default Hero
