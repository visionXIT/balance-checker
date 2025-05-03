import { Contract, formatUnits, Provider } from 'ethers';

import { erc20Abi } from './erc20.abi';

export class Erc20Contract {
  private contract: Contract;

  constructor(address: string, provider: Provider) {
    this.contract = new Contract(address, erc20Abi, provider);
  }

  async getFormatBalance(walletAddress: string) {
    const balance = await this.contract.balanceOf(walletAddress);
    return formatUnits(balance, await this.contract.decimals());
  }
}
