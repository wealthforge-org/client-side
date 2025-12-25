import React from 'react'

const AiResponseTemplate = ({ aiResponse }) => {

  if (!aiResponse) return null;

  console.log("AI Response:", aiResponse);

  return (
    <div className="bg-[#f8f9fa] rounded-xl p-6 mt-6 border-l-4 border-[#667eea]">
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200">
        <h2 className="text-gray-800 text-xl font-semibold">AI Analysis</h2>
        <span className="bg-[#667eea] text-white px-3 py-1 rounded-full text-xs font-bold">
          Powered by AI
        </span>
      </div>

      <div className="leading-relaxed text-gray-600">
        {aiResponse.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 italic">
          <span className="font-bold">Disclaimer:</span> This analysis is for educational purposes only
          and should not be considered financial advice.
        </p>
      </div>
    </div>
  )
}

export default AiResponseTemplate