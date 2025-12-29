"use client";

import React, { useEffect, useState } from "react";
import { useGetData } from "@/hooks/useGetData";
import { useAccount } from "wagmi";

const ViewAll = () => {
  const { address } = useAccount()
  const { jars, userCount, userjars, totalJarCount, profile, isLoading, isError, error, refetch } = useGetData(address);
  console.log(jars, userCount, userjars)


// active:true
// balance: 0n
// description: "This is an AI project that allows newbies setup their own ai agent, you can go through the opensource codes. When you find anything interesting tip me."
// donorsCount: 0n
// name: "Project Xenox"
// totalReceived: 0n
// version: 1n

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#FFCB39]">
        All Tip Jars
      </h1>

      {jars?.length === 0 ? (
        <p className="text-gray-500">No jars created yet.</p>
      ) : (
        <div className="grid gap-4">
          {jars?.map((jar: any, index: number) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-[#FFF]/10 border border-[#FFCB39]/30 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-white">{jar.userName}</p>
                <p className="text-sm text-gray-400">
                  Owner: {jar.owner?.slice(0, 6)}...{jar.owner?.slice(-4)}
                </p>
              </div>
              <a
                href={`https://etherscan.io/address/${jar.jarAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFCB39] text-sm underline"
              >
                View
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ViewAll;