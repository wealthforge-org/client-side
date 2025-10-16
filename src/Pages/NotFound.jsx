import React from 'react'
import { Link } from 'react-router-dom'
import PrimaryHeader from '../Components/Ui/Headers/PrimaryHeader'
import PrimaryText from '../Components/Ui/Texts/PrimaryText'
import PrimaryButton from '../Components/Ui/Buttons/PrimaryButton'
import { ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className='bg-primary text-gray-100 min-h-screen flex items-center justify-center'>
      <div className="text-center space-y-8 px-4">
        <div className="text-8xl font-bold gradient-text">404</div>
        <PrimaryHeader>Page Not Found</PrimaryHeader>
        <PrimaryText text="The page you're looking for doesn't exist or has been moved. Don't worry, you can navigate back to safety." />
        <div className="pt-8">
            <PrimaryButton 
              text="Back" 
              icon={<ArrowLeft className="mr-2" />}
              to={"/"} 
            />
        </div>
      </div>
    </div>
  )
}

export default NotFound
