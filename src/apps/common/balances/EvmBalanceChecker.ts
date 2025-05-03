import { formatUnits, JsonRpcProvider, Provider, Wallet } from 'ethers';

import { CcyAddress, CcyBalance } from '../../lib/ccy';
import { evmAddresses, TokenAddress } from '../../lib/evm-ccy-addresses';
import { EvmNetworkName, evmNetworks } from '../../lib/evm-networks';
import { BlockchainType } from '../../lib/networks';
import { Erc20Contract } from '../contracts/erc20/erc20.conract';
import { BalanceChecker } from './balance-checker.abstract';

export class EvmBalanceChecker extends BalanceChecker {
  private provider: Provider;

  private wallet: Wallet;

  private ccys: CcyAddress;

  constructor(chainName: EvmNetworkName) {
    super(chainName);

    this.provider = new JsonRpcProvider(
      evmNetworks[this._config.chainName].rpcUrl,
    );

    this.ccys = evmAddresses[chainName];
  }

  get blockchainType(): BlockchainType {
    return BlockchainType.EVM;
  }

  setPrivateKey(privateKey: string): EvmBalanceChecker {
    super.setPrivateKey(privateKey);

    this.wallet = new Wallet(privateKey, this.provider);
    this._address = this.wallet.address;
    return this;
  }

  getWalletExplorerUrl(): string {
    if (!this._address) {
      throw new Error('Address is not set');
    }

    const explorerUrl = evmNetworks[this._config.chainName].explorerUrl;

    if (!explorerUrl) {
      throw new Error('Explorer URL is not set');
    }

    return explorerUrl(this._address);
  }

  async checkBalance(): Promise<CcyBalance> {
    const result: CcyBalance = {};

    for (const ccy of Object.keys(this.ccys)) {
      if (this.ccys[ccy] === 'Native') {
        result[ccy] = await this.checkNativeBalance();
      } else {
        result[ccy] = await this.checkTokenBalance(this.ccys[ccy]);
      }
    }

    return result;
  }

  private async checkNativeBalance() {
    const balance = await this.provider.getBalance(this._address);
    return formatUnits(balance, 18);
  }

  private async checkTokenBalance(address: TokenAddress) {
    const contract = new Erc20Contract(address, this.provider);
    const balance = await contract.getFormatBalance(this._address);
    return balance;
  }
}

//0b5c72bc3176f7ad5cb5d94f82b0aa40c6fae998e9303bd98d0e3e9fcd617965
