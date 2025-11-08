"use client";

import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import abi from "@/app/constants/abi.json";
import { toast } from "sonner";
import { ErrorDecoder } from "ethers-decode-error";

const Create = () => {
  const { writeContractAsync } = useWriteContract();
  const [userName, setUsername] = useState("");
  const errorDecoder = ErrorDecoder.create([abi]);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  const createJar = async () => {
    try {
      const res = await writeContractAsync({
        abi,
        address: contractAddress,
        functionName: "createJar",
        args: [userName],
      });
      console.log(res)
      if(res) {
        toast.success("Jar created successfully!");
      } else {
      toast.error("Jar creation Failed!");
      }
    } catch (err: any) {
      const decodedError = await errorDecoder.decode(err);
      toast.error(`Error creating jar - ${decodedError.reason}`, {
        position: "top-center",
      });
    }
  };

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
        />
        <button
          className="bg-[#FFCB39] p-3 px-6 rounded-xl text-[#0E1D20] font-medium"
          onClick={createJar}
        >
          Create Jar
        </button>
      </div>
    </main>
  );
};

export default Create;
