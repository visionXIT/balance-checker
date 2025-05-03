import axios from 'axios';

export type GetCardanoAssetsResponse = {
  address: string;
  amount: {
    unit: string;
    quantity: string;
    decimals?: number;
    has_nft_onchain_metadata: boolean;
  }[];
  stake_address: string;
  type: string;
  script: boolean;
};

export const getCardanoAssets = async (
  address: string,
  projectIdKey: string,
): Promise<GetCardanoAssetsResponse> => {
  const options = {
    method: 'GET',
    url: `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}/extended`,
    headers: { project_id: projectIdKey },
  };

  try {
    const response = await axios.request<GetCardanoAssetsResponse>(options);

    if (response.status !== 200) {
      console.error(response.data);
      throw new Error('Failed to get cardano assets');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
