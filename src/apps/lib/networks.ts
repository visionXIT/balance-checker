import { EvmNetworkName } from './evm-networks';

export type Network = EvmNetworkName | 'Cardano' | 'Solana';

export enum BlockchainType {
  EVM = 'EVM',
  Cardano = 'Cardano',
  Solana = 'Solana',
}
