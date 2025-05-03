import { Module } from '@nestjs/common';

import { BalanceCheckFabric } from './balance-checker-fabric';

@Module({
  imports: [],
  providers: [BalanceCheckFabric],
  exports: [BalanceCheckFabric],
})
export class CommonBalancesModule {}
