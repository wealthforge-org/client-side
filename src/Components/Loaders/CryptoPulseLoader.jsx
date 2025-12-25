const CryptoPulseLoader = ({ size = 'medium', text = 'Loading cryptocurrency data...' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-[100vh]">
      {/* Bitcoin-inspired loader */}
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white font-bold text-xs">₿</div>
          </div>
        </div>
        
        {/* Orbiting circles */}
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500 rounded-full animate-orbit-slow"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-orbit-medium"></div>
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-purple-500 rounded-full animate-orbit-fast"></div>
      </div>
      
      <p className="mt-4 text-gray-300 text-lg font-medium">{text}</p>
      
      {/* Progress dots */}
      <div className="flex space-x-2 mt-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default CryptoPulseLoader;