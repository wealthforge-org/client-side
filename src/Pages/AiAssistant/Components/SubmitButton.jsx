import React from 'react'

const SubmitButton = ({selectedCrypto, loading, isAnalyzing}) => {
    return (
        <button
            type="submit"
            disabled={!selectedCrypto || loading || isAnalyzing}
            className="
          py-3 px-8 
          bg-gradient-to-r from-[#667eea] to-[#764ba2]
          text-white font-semibold text-[1.1rem] uppercase tracking-wide
          rounded-lg transition-all duration-300 
          disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none
          hover:-translate-y-1 hover:shadow-lg hover:shadow-[#667eea]/40
        "
        >
            {isAnalyzing ? 'Analyzing...' : 'Get AI Analysis'}
        </button>
    )
}

export default SubmitButton