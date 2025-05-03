import axios from 'axios';

export const getCoinGeckoRate = async (
  ccy: string,
  apiKey: string,
): Promise<number> => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols=${ccy}`;

  const res = await axios.get(url, {
    headers: {
      'x-cg-demo-api-key': apiKey,
    },
  });

  return res.data[0]?.current_price;
};
