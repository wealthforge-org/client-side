export const fetchCryptoList = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch cryptocurrency data');
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message || 'Error fetching crypto list');
  }
};
