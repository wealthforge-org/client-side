import React from 'react';
import PrimaryHeader from '../../../Components/Ui/Headers/PrimaryHeader';


const AiHeader = () => {
  return (
    <div className="text-center mb-10 text-white">
      <PrimaryHeader className=" mb-2">AI Crypto Assistant</PrimaryHeader>
      <p className='text-[1.1rem] opacity-90'>
        Get AI-powered analysis and insights for any cryptocurrency
      </p>
    </div>
  );
};

export default AiHeader;
