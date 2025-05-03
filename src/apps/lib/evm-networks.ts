import { EvmCcy } from './evm-ccy-addresses';
import {
  getFlareWalletExplorerUrl,
  getMantleWalletExplorerUrl,
} from './wallet-explorer';

export const evmNetworks: Record<EvmNetworkName, EvmNetwork> = {
  Flare: {
    chainId: 1,
    coin: 'FLR',
    rpcUrl: 'https://rpc.ankr.com/flare',
    explorerUrl: getFlareWalletExplorerUrl,
  },
  Mantle: {
    chainId: 5000,
    coin: 'MNT',
    rpcUrl: 'https://rpc.mantle.xyz',
    explorerUrl: getMantleWalletExplorerUrl,
  },
};

export type EvmNetwork = {
  chainId: number;
  coin: EvmCcy;
  rpcUrl: string;
  explorerUrl?: (address: string) => string;
};

export type EvmNetworkName = 'Flare' | 'Mantle';
