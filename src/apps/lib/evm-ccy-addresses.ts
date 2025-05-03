import { EvmNetworkName } from './evm-networks';

export const evmAddresses: Record<
  EvmNetworkName,
  Partial<Record<EvmCcy, TokenAddress>>
> = {
  Flare: {
    FLR: 'Native',
    USDT: '0x0B38e83B86d491735fEaa0a791F65c2B99535396',
    USDT0: '0xe7cd86e13AC4309349F30B3435a9d337750fC82D',
  },
  Mantle: {
    MNT: 'Native',
    USDT: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE',
  },
};

export type FlareCcy = 'FLR' | 'USDT' | 'USDT0';
export type MantleCcy = 'MNT' | 'USDT';

export type EvmCcy = FlareCcy | MantleCcy;
export type TokenAddress = string | 'Native';
