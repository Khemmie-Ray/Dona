"use client";

import React, { useState } from "react";
import { 
  useWriteContract, 
  useWaitForTransactionReceipt,
  useSimulateContract,
  type BaseError 
} from "wagmi";
import { parseAbiItem } from "viem";
import abi from "@/app/constants/abi.json";
import { toast } from "sonner";

const Create = () => {
  const [userName, setUsername] = useState("");
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  // 1. SIMULATE CONTRACT CALL (Cost-free validation)
  // This checks if the transaction would succeed WITHOUT spending gas
  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: contractAddress,
    abi,
    functionName: "createJar",
    args: [userName],
    query: {
      enabled: userName.length > 0, // Only simulate when username is entered
    },
  });

  // 2. WRITE CONTRACT (Actual transaction)
  const { 
    data: hash, 
    writeContract, 
    isPending: isWritePending,
    error: writeError 
  } = useWriteContract();

  // 3. WAIT FOR TRANSACTION CONFIRMATION
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({
    hash,
  });

  // Handle transaction confirmation
  React.useEffect(() => {
    if (isConfirmed) {
      toast.success("Jar created successfully!");
      setUsername(""); // Clear input
    }
  }, [isConfirmed]);

  // Handle errors
  React.useEffect(() => {
    if (writeError) {
      toast.error(
        `Error: ${(writeError as BaseError).shortMessage || writeError.message}`,
        { position: "top-center" }
      );
    }
  }, [writeError]);

  const createJar = async () => {
    if (!userName.trim()) {
      toast.error("Please enter a username");
      return;
    }

    // Check simulation before writing
    if (simulateError) {
      toast.error(`Transaction would fail: ${simulateError.message}`);
      return;
    }

    try {
      // Use the simulated request (includes gas estimation)
      writeContract(simulateData!.request);
    } catch (err) {
      console.error("Transaction error:", err);
    }
  };

  // Determine button state
  const isLoading = isWritePending || isConfirming;
  const isDisabled = isLoading || !userName.trim() || !!simulateError;

  return (
    <main className="w-full flex justify-between">
      <div className="rounded-[21px] p-8 flex flex-col w-full lg:w-[40%] md:w-[40%] shadow-2xl bg-[#FFF]/20">
        <p className="mb-2">Enter a username</p>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@0xhenchman"
          className="p-3 mb-6 border border-white/20 rounded-2xl"
          disabled={isLoading}
        />
        
        {/* Show simulation error */}
        {simulateError && userName && (
          <p className="text-red-500 text-sm mb-2">
            ⚠️ {(simulateError as BaseError).shortMessage}
          </p>
        )}

        <button
          className="bg-[#FFCB39] p-3 px-6 rounded-xl text-[#0E1D20] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={createJar}
          disabled={isDisabled}
        >
          {isWritePending && "Confirm in wallet..."}
          {isConfirming && "Creating jar..."}
          {!isLoading && "Create Jar"}
        </button>

{/*       
        {hash && (
          
            href={`https://etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm text-blue-400 hover:underline"
          >
            View transaction →
          </a>
        )} */}
      </div>
    </main>
  );
};

export default Create;