import React, { useState, useEffect } from 'react';
import { fetchCryptoList } from '../../API/ExternalApis/fetchCryptoList';
import axios from 'axios';

import { handleAiResponse }  from '../../API/InternalApis/fetchAiAnalysis';

import AiHeader from './Components/AiHeader';
import CryptoSelect from './Components/CryptoSelect';
import AnalyzeButton from './Components/AnalyzeButton';

import ErrorTemplate from './Components/ErrorTemplate';
import AiResponseTemplate from './Components/AiResponseTemplate';
import LoadingTemplate from './Components/LoadingTemplate';

const AiAssistant = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  /**
   * ===================================== 
   *      Fetch Cryptocurrency List 
   * =====================================
   */
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
  /**
   * ===================================== 
   * =====================================
   */

  // Fetch AI analysis
  const fetchAiAnalysis = async () => {
    if (!selectedCrypto) return setError("Please select a cryptocurrency first");

    try {
      setIsAnalyzing(true);
      setAiResponse("");
      setError("");

      const selectedCryptoData = cryptos.find(
        (c) => c.id === selectedCrypto
      );

      const requestBody = {
        currentPrice: selectedCryptoData.current_price,
        priceChange24h: selectedCryptoData.price_change_percentage_24h,
        marketCap: selectedCryptoData.market_cap,
        coinName: selectedCryptoData.name,
      };

      const data = await handleAiResponse(requestBody);

      console.log("AI Service Response:", data);

      if (data.status === 200 && data.payload?.suggestion) {
        setAiResponse(data.payload.suggestion);
      } else {
        throw new Error("Invalid response format from AI service");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsAnalyzing(false);
    }
  };


  useEffect(() => { fetchCryptoData(); }, []);

  const handleSubmit = e => {
    e.preventDefault();
    fetchAiAnalysis();
  };

  return (
    <div className="max-w-[800px] mx-auto p-5 font-sans min-h-screen">
      <AiHeader />

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <CryptoSelect
            cryptos={cryptos}
            selectedCrypto={selectedCrypto}
            setSelectedCrypto={setSelectedCrypto}
            loading={loading}
            isAnalyzing={isAnalyzing}
            onKeyPress={(e) => e.key === "Enter" && selectedCrypto && fetchAiAnalysis()}
          />

          <AnalyzeButton
            disabled={!selectedCrypto || loading || isAnalyzing}
            isAnalyzing={isAnalyzing}
          />
        </form>

        {loading && <LoadingTemplate />}
        {error && <ErrorTemplate error={error} setError={setError} />}
        {aiResponse && <AiResponseTemplate aiResponse={aiResponse} />}
      </div>
    </div>
  );
};

export default AiAssistant;
