import { useChainId } from "wagmi";
import { TIPJAR_ADDRESSES, isSupportedChain } from "@/constants/contract";

export function useContractAddress() {
  const chainId = useChainId();

  const address = chainId ? TIPJAR_ADDRESSES[chainId] : undefined;
  const isSupported = isSupportedChain(chainId);

  return {
    address,
    chainId,
    isSupported,
  };
}