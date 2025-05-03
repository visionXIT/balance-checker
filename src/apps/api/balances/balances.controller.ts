import { Controller, Get, SerializeOptions } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BalancesService } from './balances.service';
import { BalanceResponseDto } from './dto/BalanceResponseDto';

@ApiTags('Balances')
@Controller('/balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  @ApiOperation({ summary: 'Get balances' })
  @ApiResponse({
    status: 200,
    type: [BalanceResponseDto],
  })
  @SerializeOptions({ type: BalanceResponseDto })
  async getBalances(): Promise<BalanceResponseDto[]> {
    return this.balancesService.getBalances();
  }
}
