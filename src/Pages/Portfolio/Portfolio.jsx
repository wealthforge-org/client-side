import React, { useEffect, useState } from 'react';
import { Wallet, TrendingUp, DollarSign, Bitcoin, Coins } from 'lucide-react';
import { fetchAssets } from '../../API/InternalApis/fetchAssets';
import { getAssetIcon } from '../../Services/GetAssetIcon';
import { formatQuantity } from '../../Services/formatQuantity';
import CryptoPulseLoader from '../../Components/Loaders/CryptoPulseLoader';
import { formatCurrency } from '../../Services/FormatCurrency';

import Header from './Components/Header';
import StatsCard from './Components/StatsCard';

const Portfolio = () => {
  const user_id = 6; // TODO change to dynamic user ID 
  const name = localStorage.getItem('name');
  const [assets, setAssets] = useState([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        const data = await fetchAssets(user_id);
        console.log(data);

        setAssets(data.holdings || []);
        setWalletAddress(data.wallet_address || '');


        const total = data.holdings?.reduce((sum, asset) => {
          const quantity = parseFloat(asset.quantity);
          const avgPrice = parseFloat(asset.average_price);
          return sum + (quantity * avgPrice);
        }, 0) || 0;
        setTotalValue(total);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);


  if (loading) {
    return (
      CryptoPulseLoader({ size: 'large', text: 'Loading your portfolio...' })
    );
  }

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header name={name} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Portfolio Value */}
          
          <StatsCard
            title={"Total Value"}
            child={formatCurrency(totalValue)}
            icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
          />
          
          <StatsCard
            title={"Total Assets"}
            child={assets.length}
            icon={<Coins className="h-6 w-6 text-green-600" />}
          />
          
          <StatsCard
            title={"Wallet Address"}
            child={<span className='text-lg font-mono text-gray-900 mt-1 truncate'>{walletAddress}</span>}
            icon={<Wallet className="h-6 w-6 text-purple-600" />}
            className={'md:col-span-2'}
          />

        </div>

        {/* Assets Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Assets</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Asset</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Quantity</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Avg. Price</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Value</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {assets.map((asset) => {
                  const quantity = parseFloat(asset.quantity);
                  const avgPrice = parseFloat(asset.average_price);
                  const value = quantity * avgPrice;

                  return (
                    <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getAssetIcon(asset.asset_symbol)}
                          <span className="font-semibold text-gray-900">
                            {asset.asset_symbol}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{asset.asset_name}</td>
                      <td className="px-6 py-4 text-right font-mono text-gray-900">
                        {formatQuantity(asset.quantity)}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-gray-900">
                        {avgPrice > 0 ? formatCurrency(avgPrice) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-gray-900">
                        {value > 0 ? formatCurrency(value) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-500">
                        {new Date(asset.updated_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {assets.length === 0 && (
            <div className="text-center py-12">
              <Coins className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No assets found in your portfolio</p>
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <TrendingUp className="h-4 w-4" />
            Refresh Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;