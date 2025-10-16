import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/Logo'
import NavItems from './Components/NavItems'
import PrimaryButton from "../../Ui/Buttons/PrimaryButton"
import SecondaryButton from "../../Ui/Buttons/SecondaryButton"

const Navbar = ({ page }) => {
  const isSignedIn = localStorage.getItem('isSignedIn') === 'true';

  return (
    <nav className='border-b border-gray-800 py-4 px-6'>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo/>

        {isSignedIn ? (
          <div className="flex items-center space-x-4">
            <NavItems/>
            <PrimaryButton text="Profile" to="profile"/>
          </div>
        ) : (
          <div className='flex space-x-4'>
            <PrimaryButton text="Login" to={'login'}/>
            <SecondaryButton text="Sign Up" to={'sign-up'}/>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
