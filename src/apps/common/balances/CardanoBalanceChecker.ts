import { formatUnits } from 'ethers';

import { getCardanoAssetInfo } from '../../lib/cardano/blockfrost/blockfrost-get-asset-info';
import { getCardanoAssets } from '../../lib/cardano/blockfrost/blockfrost-get-assets';
import { CcyBalance } from '../../lib/ccy';
import { BlockchainType } from '../../lib/networks';
import { BalanceChecker } from './balance-checker.abstract';

export class CardanoBalanceChecker extends BalanceChecker {
  private readonly blockfrostKey: string;

  constructor(blockfrostKey: string) {
    super('Cardano');

    this.blockfrostKey = blockfrostKey;
  }

  get blockchainType(): BlockchainType {
    return BlockchainType.Cardano;
  }

  getWalletExplorerUrl(): string {
    return `https://cexplorer.io/address/${this.address}`;
  }

  async checkBalance(): Promise<CcyBalance> {
    const result: CcyBalance = {};

    const assets = await getCardanoAssets(this.address, this.blockfrostKey);

    for (const asset of assets.amount) {
      if (asset.unit === 'lovelace') {
        asset.unit = 'ADA';
      } else {
        const assetInfo = await getCardanoAssetInfo(
          asset.unit,
          this.blockfrostKey,
        );

        asset.unit = assetInfo.metadata.ticker;
      }

      result[asset.unit] = this.formatAsset(asset.quantity, asset.decimals);
    }

    return result;
  }

  private formatAsset(quantity: string, decimals?: number): string {
    return decimals ? formatUnits(quantity, decimals) : quantity;
  }
}
