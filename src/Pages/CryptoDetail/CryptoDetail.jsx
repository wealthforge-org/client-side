import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import CryptoPulseLoader from '../../Components/Loaders/CryptoPulseLoader';
import ErrorMessage from '../../Components/Ui/Error/ErrorMessage';
import { fetchCryptoDetail } from '../../API/ExternalApis/fetchCryptoDetail';

const CryptoDetail = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('buy');
  const [amount, setAmount] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('');
  const [wallet, setWallet] = useState({
    USDT: 0, // Starting balance
    holdings: {} // Will store crypto holdings
  });

  // Mock user portfolio - in real app, this would come from backend
  const [portfolio, setPortfolio] = useState({
    totalValue: 10000.00,
    holdings: {}
  });

  const loadCryptoData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchCryptoDetail(id);
      setCrypto(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCryptoData();
    const interval = setInterval(loadCryptoData, 10000);
    return () => clearInterval(interval);
  }, [loadCryptoData]);


  const currentHolding = portfolio.holdings[crypto?.symbol?.toUpperCase()] || 0;
  const currentValue = currentHolding * (crypto?.current_price || 0);

  const formatPrice = (price) => {
    if (price < 1) return '$' + price.toFixed(6);
    return '$' + price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toLocaleString();
  };

  const formatPercentage = (percentage) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  // Handle buy transaction
  const handleBuy = () => {
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const totalCost = parseFloat(amount) * crypto.current_price;
    
    if (totalCost > wallet.USDT) {
      alert('Insufficient USDT balance');
      return;
    }

    // Update wallet and portfolio
    const updatedWallet = {
      ...wallet,
      USDT: wallet.USDT - totalCost
    };

    const updatedHoldings = {
      ...portfolio.holdings,
      [crypto.symbol.toUpperCase()]: (portfolio.holdings[crypto.symbol.toUpperCase()] || 0) + parseFloat(amount)
    };

    const updatedPortfolio = {
      ...portfolio,
      holdings: updatedHoldings,
      totalValue: portfolio.totalValue // Would recalculate based on current prices
    };

    setWallet(updatedWallet);
    setPortfolio(updatedPortfolio);
    setAmount('');
    setUsdtAmount('');

    alert(`Successfully bought ${amount} ${crypto.symbol.toUpperCase()} for $${totalCost.toFixed(2)}`);
  };

  // Handle sell transaction
  const handleSell = () => {
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (amount > currentHolding) {
      alert('Insufficient crypto balance');
      return;
    }

    const totalValue = parseFloat(amount) * crypto.current_price;

    // Update wallet and portfolio
    const updatedWallet = {
      ...wallet,
      USDT: wallet.USDT + totalValue
    };

    const updatedHoldings = {
      ...portfolio.holdings,
      [crypto.symbol.toUpperCase()]: currentHolding - parseFloat(amount)
    };

    const updatedPortfolio = {
      ...portfolio,
      holdings: updatedHoldings,
      totalValue: portfolio.totalValue // Would recalculate based on current prices
    };

    setWallet(updatedWallet);
    setPortfolio(updatedPortfolio);
    setAmount('');
    setUsdtAmount('');

    alert(`Successfully sold ${amount} ${crypto.symbol.toUpperCase()} for $${totalValue.toFixed(2)}`);
  };

  // Sync USDT amount when crypto amount changes
  const handleAmountChange = (value) => {
    setAmount(value);
    if (value && crypto) {
      const usdtValue = parseFloat(value) * crypto.current_price;
      setUsdtAmount(usdtValue.toFixed(2));
    } else {
      setUsdtAmount('');
    }
  };

  // Sync crypto amount when USDT amount changes
  const handleUsdtAmountChange = (value) => {
    setUsdtAmount(value);
    if (value && crypto) {
      const cryptoAmount = parseFloat(value) / crypto.current_price;
      setAmount(cryptoAmount.toFixed(6));
    } else {
      setAmount('');
    }
  };

  // Calculate max buyable amount
  const getMaxBuyAmount = () => {
    return (wallet.USDT / crypto.current_price).toFixed(6);
  };

  if (loading) {
    return (
        <CryptoPulseLoader />
    );
  }

  if (error) {
    return (
        <ErrorMessage 
        message="Error loading crypto data"
        onClick={fetchCryptoDetail}
        error={error}
        >
            <Link 
              to="/market" 
              className="inline-block w-full bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              ← Back to Market
            </Link>
        </ErrorMessage>
      
    );
  }

  if (!crypto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md text-center border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Crypto not found</h2>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ← Back to Market
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/market" 
          className="inline-flex items-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors mb-8 border border-gray-700"
        >
          <span>←</span>
          <span>Back to Market</span>
        </Link>

        {/* Wallet Balance */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-white text-lg font-semibold">Available Balance</h2>
              <p className="text-3xl font-bold text-white">${wallet.USDT.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT</p>
            </div>
            <div className="text-right">
              <p className="text-white/80">Your Holdings</p>
              <p className="text-2xl font-bold text-white">
                {currentHolding > 0 ? currentHolding.toFixed(6) : '0'} {crypto.symbol.toUpperCase()}
              </p>
              <p className="text-white/80">
                {currentValue > 0 ? formatPrice(currentValue) : '$0.00'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trading Interface */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              {/* Tab Navigation */}
              <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('buy')}
                  className={`flex-1 py-3 px-4 rounded-md font-semibold transition-colors ${
                    activeTab === 'buy'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setActiveTab('sell')}
                  className={`flex-1 py-3 px-4 rounded-md font-semibold transition-colors ${
                    activeTab === 'sell'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Trading Form */}
              <div className="space-y-4">
                {/* Crypto Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Amount ({crypto.symbol.toUpperCase()})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {activeTab === 'buy' && (
                      <button
                        onClick={() => handleAmountChange(getMaxBuyAmount())}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        MAX
                      </button>
                    )}
                    {activeTab === 'sell' && currentHolding > 0 && (
                      <button
                        onClick={() => handleAmountChange(currentHolding.toString())}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        MAX
                      </button>
                    )}
                  </div>
                </div>

                {/* USDT Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Amount (USDT)
                  </label>
                  <input
                    type="number"
                    value={usdtAmount}
                    onChange={(e) => handleUsdtAmountChange(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Price Info */}
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Price:</span>
                    <span className="text-white font-semibold">{formatPrice(crypto.current_price)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-400">Total Cost:</span>
                    <span className="text-white font-semibold">
                      ${usdtAmount || '0.00'}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={activeTab === 'buy' ? handleBuy : handleSell}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                    activeTab === 'buy'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {activeTab === 'buy' ? `Buy ${crypto.symbol.toUpperCase()}` : `Sell ${crypto.symbol.toUpperCase()}`}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Crypto Details */}
          <div className="lg:col-span-2">
            {/* Main Header */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                  <img 
                    src={crypto.image} 
                    alt={crypto.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {crypto.name}
                    </h1>
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {crypto.symbol.toUpperCase()}
                      </span>
                      <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Rank #{crypto.market_cap_rank}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {formatPrice(crypto.current_price)}
                  </div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold border ${
                    crypto.price_change_percentage_24h >= 0 
                      ? 'bg-green-900/50 text-green-400 border-green-800' 
                      : 'bg-red-900/50 text-red-400 border-red-800'
                  }`}>
                    {formatPercentage(crypto.price_change_percentage_24h)} (24h)
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Market Cap */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-gray-400 text-sm uppercase font-semibold tracking-wider mb-3">
                  Market Cap
                </h3>
                <div className="text-2xl font-bold text-white mb-2">
                  ${formatNumber(crypto.market_cap)}
                </div>
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                  crypto.market_cap_change_percentage_24h >= 0 
                    ? 'bg-green-900/50 text-green-400 border-green-800' 
                    : 'bg-red-900/50 text-red-400 border-red-800'
                }`}>
                  {formatPercentage(crypto.market_cap_change_percentage_24h)}
                </div>
              </div>

              {/* 24h Volume */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-gray-400 text-sm uppercase font-semibold tracking-wider mb-3">
                  24h Trading Volume
                </h3>
                <div className="text-2xl font-bold text-white">
                  ${formatNumber(crypto.total_volume)}
                </div>
              </div>

              {/* 24h High */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-gray-400 text-sm uppercase font-semibold tracking-wider mb-3">
                  24h High
                </h3>
                <div className="text-2xl font-bold text-white">
                  {formatPrice(crypto.high_24h)}
                </div>
              </div>

              {/* 24h Low */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-gray-400 text-sm uppercase font-semibold tracking-wider mb-3">
                  24h Low
                </h3>
                <div className="text-2xl font-bold text-white">
                  {formatPrice(crypto.low_24h)}
                </div>
              </div>

              {/* All Time High */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-gray-400 text-sm uppercase font-semibold tracking-wider mb-3">
                  All-Time High
                </h3>
                <div className="text-2xl font-bold text-white mb-2">
                  {formatPrice(crypto.ath)}
                </div>
                <div className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-900/50 text-red-400 border border-red-800">
                  {formatPercentage(crypto.ath_change_percentage)}
                </div>
              </div>

              {/* Circulating Supply */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-gray-400 text-sm uppercase font-semibold tracking-wider mb-3">
                  Circulating Supply
                </h3>
                <div className="text-xl font-bold text-white">
                  {formatNumber(crypto.circulating_supply)} {crypto.symbol.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Last updated: {new Date(crypto.last_updated).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetail;