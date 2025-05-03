import { formatUnits } from 'ethers';
import {
  Address,
  address as solanaAddress,
  createSolanaClient,
  SolanaClient,
} from 'gill';

import { CcyAddress, CcyBalance } from '../../lib/ccy';
import { BlockchainType } from '../../lib/networks';
import { solanaAddresses } from '../../lib/solana/solana-ccy';
import { BalanceChecker } from './balance-checker.abstract';

export class SolanaBalanceChecker extends BalanceChecker {
  private solanaClient: SolanaClient;

  private solanaAddress: Address;

  private ccys: CcyAddress;

  constructor() {
    super('Solana');

    this.solanaClient = createSolanaClient({
      urlOrMoniker: 'mainnet',
    });

    this.ccys = solanaAddresses;
  }

  get blockchainType(): BlockchainType {
    return BlockchainType.Solana;
  }

  setAddress(address: string): SolanaBalanceChecker {
    super.setAddress(address);
    this.solanaAddress = solanaAddress(address);
    return this;
  }

  getWalletExplorerUrl(): string {
    if (!this._address) {
      throw new Error('Address is not set');
    }

    return `https://solscan.io/account/${this._address}`;
  }

  async checkBalance(): Promise<CcyBalance> {
    const result: CcyBalance = {};

    for (const ccy of Object.keys(this.ccys)) {
      if (this.ccys[ccy] === 'Native') {
        result[ccy] = await this.checkNativeBalance();
      } else {
        // result[ccy] = await this.checkTokenBalance(this.ccys[ccy]);
      }
    }

    return result;
  }

  private async checkNativeBalance() {
    const { value: balance } = await this.solanaClient.rpc
      .getBalance(this.solanaAddress)
      .send();

    return formatUnits(balance, 9);
  }
}
