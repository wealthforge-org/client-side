export const fetchCryptoDetail = async (id) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&sparkline=false`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }

    const data = await response.json();
    return data[0];
  } catch (err) {
    throw new Error(err.message || 'Error fetching crypto details');
  }
};
