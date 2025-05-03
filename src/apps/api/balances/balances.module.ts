import { Module } from '@nestjs/common';

import { CommonBalancesModule } from '../../common/balances/common-balances.module';
import { RatesModule } from '../../common/rates/rates.module';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';

@Module({
  imports: [CommonBalancesModule, RatesModule],
  controllers: [BalancesController],
  providers: [BalancesService],
  exports: [BalancesService],
})
export class BalancesModule {}
