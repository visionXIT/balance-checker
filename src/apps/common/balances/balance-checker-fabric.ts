import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig } from '../../../core/config/AppConfig';
import { BalanceChecker } from './balance-checker.abstract';
import { CardanoBalanceChecker } from './CardanoBalanceChecker';
import { EvmBalanceChecker } from './EvmBalanceChecker';
import { SolanaBalanceChecker } from './SolanaBalanceChecker';

@Injectable()
export class BalanceCheckFabric {
  private balanceCheckers: BalanceChecker[] = [];

  constructor(private readonly configService: ConfigService<AppConfig>) {
    this.balanceCheckers.push(
      new EvmBalanceChecker('Flare').setAddress(
        '0xa071F248E386c6BEBC43d78D7672167E2C3b01c9',
      ),
      new EvmBalanceChecker('Mantle').setAddress(
        '0xa071F248E386c6BEBC43d78D7672167E2C3b01c9',
      ),
      new CardanoBalanceChecker(
        this.configService.get('blockfrost.projectId', {
          infer: true,
        }),
      ).setAddress(
        'addr1qxk7ef2zw6smewvqrw2u4m42rfnm0kxgrvlk97lv6u37xptdke5ex83ns425gf5uj9luwjmhlwjl5gzurpdz8lt4he9sqljt7e',
      ),
      new SolanaBalanceChecker().setAddress(
        'ED2XCtsXPZz7oxcVHTCWoxSSh2yjZkMGLnUSwSmgwJXu',
      ),
    );
  }

  getBalanceCheckers() {
    return this.balanceCheckers;
  }
}
