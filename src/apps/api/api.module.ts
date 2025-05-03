import { Module } from '@nestjs/common';

import { AppConfigModule } from '~core/config/AppConfigModule';
import { DatabaseModule } from '~core/db/DatabaseModule';
import { AppLoggerModule } from '~core/logger/AppLoggerModule';

import { BalancesModule } from './balances/balances.module';

@Module({
  imports: [AppConfigModule, AppLoggerModule, DatabaseModule, BalancesModule],
})
export class ApiModule {}
