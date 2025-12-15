"use client";

import React, { useState } from "react";
import { useCreateJar } from "../../hooks/useCreate";
import type { BaseError } from "wagmi";

const Create = () => {
  const [userName, setUsername] = useState("");

  const {
    createJar,
    isPending,
    isConfirming,
    isLoading,
    hash,
    error,
  } = useCreateJar({
    onSuccess: () => setUsername(""),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJar(userName);
  };

  const getButtonText = () => {
    if (isPending) return "Confirm in wallet...";
    if (isConfirming) return "Creating jar...";
    return "Create Jar";
  };

  return (
    <main className="w-full flex justify-between">
      <form
        onSubmit={handleSubmit}
        className="rounded-[21px] p-8 flex flex-col w-full lg:w-[40%] md:w-[40%] shadow-2xl bg-[#FFF]/20"
      >
        <label htmlFor="jar-username" className="mb-2">
          Enter a username
        </label>
        <input
          id="jar-username"
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@0xhenchman"
          className="p-3 mb-6 border border-white/20 rounded-2xl bg-transparent"
          disabled={isLoading}
        />

        {error && (
          <p className="text-red-500 text-sm mb-4">
            ⚠️ {(error as BaseError).shortMessage || error.message}
          </p>
        )}

        <button
          type="submit"
          className="bg-[#FFCB39] p-3 px-6 rounded-xl text-[#0E1D20] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !userName.trim()}
        >
          {getButtonText()}
        </button>
{/* 
        {hash && (
          <a
            href={`https://etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm text-blue-400 hover:underline"
          >
            View transaction →
          </a>
        )} */}
      </form>
    </main>
  );
};

export default Create;