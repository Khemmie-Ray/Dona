import { baseSepolia, base, arbitrumSepolia, sepolia} from "wagmi/chains";

export const TIPJAR_ADDRESSES: Record<number, `0x${string}`> = {
  [baseSepolia.id]: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`,
  [base.id]: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_BASE! as `0x${string}`,
  [sepolia.id]: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA! as `0x${string}`,
  [arbitrumSepolia.id]: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_ARBSEPOLIA! as `0x${string}`,
};

export const SUPPORTED_CHAINS = [baseSepolia, base, arbitrumSepolia, sepolia];

export const isSupportedChain = (chainId: number | undefined): boolean => {
  return chainId ? chainId in TIPJAR_ADDRESSES : false;
};