import { CcyBalance } from '../../lib/ccy';
import { BlockchainType, Network } from '../../lib/networks';
import { BalanceConfig } from './balance-config.type';

export abstract class BalanceChecker {
  protected _address: string;

  protected _privateKey: string;

  protected _config: BalanceConfig;

  constructor(chainName: Network) {
    this._config = {
      chainName,
    };
  }

  setPrivateKey(privateKey: string): BalanceChecker {
    this._privateKey = privateKey;
    return this;
  }

  setAddress(address: string): BalanceChecker {
    this._address = address;
    return this;
  }

  get address(): string {
    return this._address;
  }

  get config(): BalanceConfig {
    return this._config;
  }

  abstract getWalletExplorerUrl(): string;

  abstract get blockchainType(): BlockchainType;

  abstract checkBalance(): Promise<CcyBalance>;
}
