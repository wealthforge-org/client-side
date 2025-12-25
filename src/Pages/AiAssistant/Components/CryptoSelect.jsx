const CryptoSelect = ({
  cryptos,
  selectedCrypto,
  setSelectedCrypto,
  loading,
  isAnalyzing,
  onKeyPress
}) => {
  return (
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
        onKeyPress={onKeyPress}
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
  );
};

export default CryptoSelect;
