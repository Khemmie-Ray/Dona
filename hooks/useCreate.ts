// hooks/useCreateJar.ts
import { useCallback, useEffect } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import abi from "@/constants/abi.json";
import { toast } from "sonner";

interface UseCreateJarOptions {
  onSuccess?: () => void;
}

export function useCreateJar(options?: UseCreateJarOptions) {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });

  // Handle successful confirmation
  useEffect(() => {
    if (isConfirmed) {
      toast.success("Jar created successfully!");
      options?.onSuccess?.();
    }
  }, [isConfirmed]); // intentionally omitting options to avoid stale closure issues

  // Handle write errors
  useEffect(() => {
    if (writeError) {
      const message = (writeError as BaseError).shortMessage || writeError.message;
      toast.error(`Error: ${message}`, { position: "top-center" });
    }
  }, [writeError]);

  const createJar = useCallback(
    (userName: string) => {
      const trimmed = userName.trim();

      if (!trimmed) {
        toast.error("Please enter a username");
        return;
      }

      writeContract({
        address: contractAddress,
        abi,
        functionName: "createJar",
        args: [trimmed],
      });
    },
    [contractAddress, writeContract]
  );

  const reset = useCallback(() => {
    resetWrite();
  }, [resetWrite]);

  return {
    createJar,
    isPending: isWritePending,    
    isConfirming,                 
    isLoading: isWritePending || isConfirming,
    isSuccess: isConfirmed,
    hash,
    error: writeError,
    reset,
  };
}