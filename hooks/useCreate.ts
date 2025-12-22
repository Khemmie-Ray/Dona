"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import abi from "@/constants/abi.json";

export function useCreate() {
  const contractAddress = process.env
    .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  const { 
    writeContract, 
    data: txHash, 
    isPending: isWritePending, 
    error: writeError 
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({ hash: txHash });


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