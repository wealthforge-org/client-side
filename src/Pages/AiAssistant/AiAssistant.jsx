import React, { useState, useEffect } from 'react';
import { fetchCryptoList } from '../../API/ExternalApis/fetchCryptoList';

const AiAssistant = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const data = await fetchCryptoList();
      setCryptos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiAnalysis = async () => {
    if (!selectedCrypto) {
      setError('Please select a cryptocurrency first');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError('');
      setAiResponse('');

      const selectedCryptoData = cryptos.find(crypto => crypto.id === selectedCrypto);

      if (!selectedCryptoData) {
        throw new Error('Selected cryptocurrency data not found');
      }

      const requestBody = {
        currentPrice: selectedCryptoData.current_price,
        priceChange24h: selectedCryptoData.price_change_percentage_24h,
        marketCap: selectedCryptoData.market_cap,
        coinName: selectedCryptoData.name
      };

      const response = await fetch(
        'http://localhost:80/wealthforge/server-side/server-side/index.php?route=/Ai_suggestions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch AI analysis');
      }

      const data = await response.json();

      if (data.status === 200 && data.payload && data.payload.suggestion) {
        setAiResponse(data.payload.suggestion);
      } else {
        throw new Error('Invalid response format from AI service');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAiAnalysis();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && selectedCrypto) {
      fetchAiAnalysis();
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return (
    <div className=" max-w-[800px] mx-auto p-5 font-sans min-h-screen">
      <div className=" text-center mb-10 text-white">
        <h1 className='text-[2.5rem] mb-[10px] font-bold'>AI Crypto Assistant</h1>
        <p className='text-[1.1rem] opacity-90'>Get AI-powered analysis and insights for any cryptocurrency</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Selection Form */}
        <div className="mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Dropdown */}
            <div className="flex flex-col">
              <label
                htmlFor="crypto-select"
                className="font-semibold mb-2 text-gray-500 text-[1rem]"
              >
                Select Cryptocurrency:
              </label>

              <select
                id="crypto-select"
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading || isAnalyzing}
                className="
            text-black text-[1rem] p-3 
            border-2 border-[#e1e5e9] rounded-lg 
            bg-white transition-all duration-300
            focus:outline-none focus:border-[#667eea] 
            focus:ring-4 focus:ring-[#667eea]/10
            disabled:bg-[#f8f9fa] disabled:opacity-60
          "
              >
                <option value="">Choose a cryptocurrency...</option>
                {cryptos.map((crypto) => (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name} ({crypto.symbol.toUpperCase()}) - ${crypto.current_price}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
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

          </form>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10">
            <div
              className="
          spinner 
          border-4 border-gray-200 border-t-[#667eea]
          rounded-full w-10 h-10 mx-auto mb-5
        "
            ></div>
            <p>Loading cryptocurrency data...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-5 mb-5 text-center">
            <div className="text-red-700 font-medium mb-4">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
            <button
              onClick={() => setError('')}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* AI Response */}
        {aiResponse && (
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
                <strong>Disclaimer:</strong> This analysis is for educational purposes
                only and should not be considered financial advice.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default AiAssistant;