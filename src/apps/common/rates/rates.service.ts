import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

import { getCoinGeckoRate } from '../../lib/rates/coingecko-rate';

@Injectable()
export class RatesService {
  private readonly logger = new Logger(RatesService.name);

  private readonly coingeckoApiKey: string;

  constructor(configService: ConfigService) {
    this.coingeckoApiKey = configService.get('COINGECKO_API_KEY');
  }

  async getRate(ccy: string): Promise<number | null> {
    try {
      const rate = await getCoinGeckoRate(ccy, this.coingeckoApiKey);
      return rate;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Error getting rate for ${ccy}, code: ${error.code}`);
      } else {
        this.logger.error(`Error getting rate for ${ccy}`);
      }
      return null;
    }
  }

  async getUsdPrice(ccy: string, amount: number): Promise<number | null> {
    const rate = await this.getRate(ccy);
    return rate ? rate * amount : null;
  }
}
