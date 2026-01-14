"use client";

import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { TIPJAR_ADDRESSES, isSupportedChain } from "@/constants/contract";
import abi from "@/constants/abi.json";

export function useCreate() {
  const chainId = useChainId();
  const contractAddress = chainId
    ? TIPJAR_ADDRESSES[chainId]
    : undefined;

  const {
    writeContract,
    data: txHash,
    isPending: isWalletPending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const {
    isLoading: isMining,
    isSuccess: isConfirmed,
    isError: isReceiptError,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: !!txHash,
    },
  });

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Jar created successfully!");
      resetWrite();
    }
  }, [isConfirmed, resetWrite]);

  useEffect(() => {
    if (!writeError) return;

    const message =
      (writeError as any).shortMessage ||
      writeError.message ||
      "Transaction failed";

    toast.error(message, { position: "top-center" });
  }, [writeError]);

  useEffect(() => {
    if (!isReceiptError || !receiptError) return;

    toast.error(
      receiptError.message || "Transaction reverted",
      { position: "top-center" }
    );
  }, [isReceiptError, receiptError]);

  const createJar = (title: string, description: string) => {
    if (!title || !description) {
      toast.error("Please enter a title and description");
      return;
    }

    if (!contractAddress) {
      toast.error("Contract not found for this network");
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

  const status = useMemo(() => {
    if (isWalletPending) return "wallet";
    if (isMining) return "mining";
    if (isConfirmed) return "success";
    if (writeError || isReceiptError) return "error";
    return "idle";
  }, [
    isWalletPending,
    isMining,
    isConfirmed,
    writeError,
    isReceiptError,
  ]);

  return {
    createJar,
    txHash,
    isWalletPending,
    isMining,
    isConfirmed,
    status,
    error: writeError || receiptError,
  };
}
