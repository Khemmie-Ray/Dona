import { useCallback, useEffect } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  type BaseError,
} from "wagmi";
import abi from "@/constants/abi.json";
import { toast } from "sonner";
import { TIPJAR_ADDRESSES, isSupportedChain } from "@/constants/contract";

interface UseCreateProfileOptions {
  onSuccess?: () => void;
}

const useCreateProfile = (options?: UseCreateProfileOptions) => {
  const chainId = useChainId();
  const contractAddress = chainId ? TIPJAR_ADDRESSES[chainId] : undefined;

  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Profile created successfully!");
      options?.onSuccess?.();
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (writeError) {
      const message =
        (writeError as BaseError).shortMessage || writeError.message;
      toast.error(`Error: ${message}`, { position: "top-center" });
    }
  }, [writeError]);

  const createProfile = useCallback(
    (userName: string, socials: string) => {
      if (!contractAddress) {
        toast.error("Please connect to a supported network");
        return;
      }

      if (!isSupportedChain(chainId)) {
        toast.error("Please switch to a supported network");
        return;
      }

      writeContract({
        address: contractAddress,
        abi,
        functionName: "createProfile",
        args: [userName, socials],
      });
    },
    [contractAddress, writeContract]
  );

  const reset = useCallback(() => {
    resetWrite();
  }, [resetWrite]);

  return {
    createProfile,
    isPending: isWritePending,
    isConfirming,
    isLoading: isWritePending || isConfirming,
    isSuccess: isConfirmed,
    hash,
    error: writeError,
    reset,
  };
};

export default useCreateProfile;
