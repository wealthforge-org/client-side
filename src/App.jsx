import { useState } from 'react'
import './Styles/App.css'
import Logo from './assets/Logo'
import PrimaryButton from './Components/Ui/Buttons/PrimaryButton'
import SecondaryButton from './Components/Ui/Buttons/SecondaryButton'

function App() {

  return (
    <div className='bg-primary text-gray-100 min-h-screen'>
      
      <div  className="fixed inset-0 -z-10"></div>
      <Logo />
      <PrimaryButton text="Login"/>
      <SecondaryButton text="Sign up"/>
      
    </div>
  )
}

export default App
