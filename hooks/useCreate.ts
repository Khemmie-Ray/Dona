"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { TIPJAR_ADDRESSES, isSupportedChain } from "@/constants/contract";
import abi from "@/constants/abi.json";
import { ErrorDecoder } from "ethers-decode-error";

export function useCreate() {
  const chainId = useChainId();
  const contractAddress = chainId ? TIPJAR_ADDRESSES[chainId] : undefined;
  const errorDecoder = ErrorDecoder.create([abi]);

  const {
    writeContract,
    data: txHash,
    isPending: isWritePending,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Jar created successfully!");
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (writeError) {
      const errorMessage =
        (writeError as any).shortMessage ||
        writeError.message ||
        "Transaction failed";

      toast.error(`Error: ${errorMessage}`, {
        position: "top-center",
      });
    }
  }, [writeError]);

  const createJar = (title: string, description: string) => {
    if (!title || !description) {
      toast.error("Please enter a title and description");
      return;
    }

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
      functionName: "createJar",
      args: [title, description],
    });
  };

  return {
    createJar,
    isPending: isWritePending || isConfirming,
    isSuccess: isConfirmed,
    error: writeError,
    txHash,
  };
}
