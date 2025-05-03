import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppConfigModule } from '~core/config/AppConfigModule';
import { DatabaseModule } from '~core/db/DatabaseModule';
import { AppLoggerModule } from '~core/logger/AppLoggerModule';

@Module({
  imports: [
    AppConfigModule,
    AppLoggerModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
  ],
  providers: [],
})
export class AppScheduleModule {}
