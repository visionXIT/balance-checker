import { CardanoCcy } from './cardano/cardano-ccy';
import { EvmCcy, TokenAddress } from './evm-ccy-addresses';
import { SolanaCcy } from './solana/solana-ccy';

export type Ccy = EvmCcy | CardanoCcy | SolanaCcy;

export type CcyBalance = Partial<Record<Ccy, string>>;
export type CcyAddress = Partial<Record<Ccy, TokenAddress>>;
