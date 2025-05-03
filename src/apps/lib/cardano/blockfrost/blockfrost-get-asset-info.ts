import axios from 'axios';

export type GetCardanoAssetsResponse = {
  asset: string;
  policy_id: string;
  asset_name: string;
  fingerprint: string;
  quantity: string;
  initial_mint_tx_hash: string;
  mint_or_burn_count: number;
  onchain_metadata: {
    ANY_ADDITIONAL_PROPERTY: string;
  };
  onchain_metadata_standard: string;
  onchain_metadata_extra: string;
  metadata: {
    name: string;
    description: string;
    ticker: string;
    url: string;
    logo: string;
    decimals: number;
  };
};

export const getCardanoAssetInfo = async (
  assetId: string,
  projectIdKey: string,
): Promise<GetCardanoAssetsResponse> => {
  const options = {
    method: 'GET',
    url: `https://cardano-mainnet.blockfrost.io/api/v0/assets/${assetId}`,
    headers: { project_id: projectIdKey },
  };

  try {
    const response = await axios.request<GetCardanoAssetsResponse>(options);

    if (response.status !== 200) {
      console.error(response.data);
      throw new Error('Failed to get cardano asset info');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
