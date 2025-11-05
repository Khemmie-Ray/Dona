"use client";

import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import abi from "@/app/constants/abi.json";

const Create = () => {
  const { writeContract } = useWriteContract();
  const [userName, setUsername] = useState("");

  const createJar = async () => {
    try {
      await writeContract({
        abi,
        address: "0x4a4369E2F1E07d97F3c97b81B8Ab60bE0cb3641a",
        functionName: "createJar",
        args: [userName],
      });
      console.log("Jar created successfully!");
    } catch (err) {
      console.error("Error creating jar:", err);
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
        <button className="bg-[#FFCB39] p-3 px-6 rounded-xl text-[#0E1D20] font-medium" 
          onClick={createJar}
          >
          Create Jar
        </button>
      </div>
    </main>
  );
};

export default Create;
