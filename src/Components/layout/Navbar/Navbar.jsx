import React from 'react'
import Logo from '../../../assets/Logo'
import NavItems from './Components/NavItems';
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import SecondaryButton from "../../Ui/Buttons/SecondaryButton"

const Navbar = ({
    page,
}) => {

  let isSignedIn = localStorage.getItem('isSignedIn') == true;

  return (
    <nav className='border-b border-gray-800 py-4 px-6'>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo/>
        {isSignedIn && <NavItems/>}
        {isSignedIn && <PrimaryButton text="Profile"/>}
        {!isSignedIn && <div className='flex space-x-4'>
          <PrimaryButton text="Login"/>
          <SecondaryButton text="Sign Up"/>
        </div>}
      </div>
    </nav>
  )
}

export default Navbar
