import React from 'react'
import AiCards from './AiCards'
import { ChartNoAxesColumnIncreasing } from 'lucide-react';
import { Shield } from 'lucide-react';
import { RefreshCcw } from 'lucide-react';

const AiInfoSection = () => {
  return (
    <div className='grid md:grid-cols-3 gap-8 max-w-4xl mt-10'>
      <AiCards 
      icon={<ChartNoAxesColumnIncreasing/>}
      title={"Market Predictions"}
      text={">Our AI analyzes historical data and market trends to forecast price movements with 87% accuracy."}
      />
      <AiCards 
      icon={<Shield/>}
      title={"Risk Assessment"}
      text={"Get personalized risk scores for each asset based on volatility, market cap, and liquidity."}
      />
      <AiCards 
      icon={<RefreshCcw/>}
      title={"Auto-Rebalancing"}
      text={"Let our system automatically adjust your portfolio to maintain optimal asset allocation."}
      />
    </div>
  )
}

export default AiInfoSection
