import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../Components/Ui/Error/ErrorMessage';
import CryptoPulseLoader from '../../Components/Loaders/CryptoPulseLoader';
import PrimaryHeader from '../../Components/Ui/Headers/PrimaryHeader';
import PrimaryText from '../../Components/Ui/Texts/PrimaryText';
import Searchbar from '../../Components/Ui/Searchbar/Searchbar';
import { fetchCryptoList } from '../../API/ExternalApis/fetchCryptoList';
import { formatPrice } from '../../Services/formatPriceService';
import { formatMarketCap } from '../../Services/FormatMarketCapService';

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  const fetchCryptoData = async () => {
    try {
      const data = await fetchCryptoList();  
      setCryptos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();

    const interval = setInterval(fetchCryptoData, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );



  if (loading) {
    return (
      <CryptoPulseLoader/>
    );
  }

  if (error) {
    return (
      <ErrorMessage message='Error loading data' onClick={fetchCryptoData} error={error}/>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <PrimaryHeader>
            💰 Crypto Market Live
          </PrimaryHeader>
          <PrimaryText className=" mb-8"  text={"Live cryptocurrency prices - Updates every 10 seconds"}/>
          <Searchbar placeholder={'Search cryptocurrencies...'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </header>

        {/* Crypto Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCryptos.map((crypto) => (
            <Link 
              to={`/crypto/${crypto.id}`} 
              key={crypto.id}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={crypto.image} 
                      alt={crypto.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {crypto.name}
                      </h3>
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {crypto.symbol.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    #{crypto.market_cap_rank}
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(crypto.current_price === null ? 0 : crypto.current_price)}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    crypto.price_change_percentage_24h >= 0 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {crypto.price_change_percentage_24h >= 0 ? '↗' : '↘'} 
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>

                {/* Market Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/80">
                    <span>Market Cap:</span>
                    <span className="font-medium text-white">
                      {formatMarketCap(crypto.market_cap)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>24h Volume:</span>
                    <span className="font-medium text-white">
                      {formatMarketCap(crypto.total_volume)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>24h High:</span>
                    <span className="font-medium text-white">
                      {formatPrice(crypto.high_24h)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>24h Low:</span>
                    <span className="font-medium text-white">
                      {formatPrice(crypto.low_24h)}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <span className="text-blue-300 font-medium group-hover:text-blue-200 transition-colors">
                    Click for details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCryptos.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-2">No cryptocurrencies found</h3>
              <p className="text-white/70">Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoList;