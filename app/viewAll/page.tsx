"use client";

import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import abi from "@/app/constants/abi.json";

const ViewAll = () => {
  const contractAddress = process.env
    .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  const [jars, setJars] = useState<any[]>([]);

  const { data, isError, isLoading } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getAllJars",
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setJars(data);
    }
  }, [data]);

  if (isLoading) return <p className="p-8 text-gray-400">Loading jars...</p>;
  if (isError) return <p className="p-8 text-red-500">Error fetching jars.</p>;
  console.log(jars)


  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#FFCB39]">
        All Tip Jars
      </h1>

      {jars.length === 0 ? (
        <p className="text-gray-500">No jars created yet.</p>
      ) : (
        <div className="grid gap-4">
          {jars.map((jar: any, index: number) => (
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