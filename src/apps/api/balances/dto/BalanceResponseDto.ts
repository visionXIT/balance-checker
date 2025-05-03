import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { BlockchainType } from '../../../lib/networks';

export class BalanceDto {
  @ApiProperty()
  @Expose()
  ccy: string;

  @ApiProperty()
  @Expose()
  balance: string;

  @ApiPropertyOptional()
  @Expose()
  usdPrice: string | null;
}

export class BalanceResponseDto {
  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  chainName: string;

  @ApiProperty({ type: [BalanceDto] })
  @Expose()
  @Type(() => BalanceDto)
  balances: BalanceDto[];

  @ApiProperty({ enum: BlockchainType })
  @Expose()
  blockchainType: BlockchainType;

  @ApiPropertyOptional()
  @Expose()
  explorerUrl: string;
}
