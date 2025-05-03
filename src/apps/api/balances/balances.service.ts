import { Injectable } from '@nestjs/common';

import { BalanceCheckFabric } from '../../common/balances/balance-checker-fabric';
import { RatesService } from '../../common/rates/rates.service';
import { formatBalance } from '../../lib/balance-format';

@Injectable()
export class BalancesService {
  constructor(
    private readonly balanceCheckFabric: BalanceCheckFabric,
    private readonly ratesService: RatesService,
  ) {}

  async getBalances() {
    const balanceCheckers = this.balanceCheckFabric.getBalanceCheckers();

    const balances = await Promise.all(
      balanceCheckers.map(async (checker) => ({
        address: checker.address,
        chainName: checker.config.chainName,
        balances: await Promise.all(
          Object.entries(await checker.checkBalance())
            .filter(([, balance]) => +balance > 0)
            .map(async ([ccy, balance]) => ({
              ccy,
              balance: formatBalance(balance),
              usdPrice: formatBalance(
                await this.ratesService.getUsdPrice(ccy, +balance),
              ),
            })),
        ),
        explorerUrl: checker.getWalletExplorerUrl(),
        blockchainType: checker.blockchainType,
      })),
    );

    return balances;
  }
}
