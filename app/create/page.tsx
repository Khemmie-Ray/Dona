"use client";

import React, { useState, useEffect } from "react";
import { useCreate } from "@/hooks/useCreate";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { createJar, isPending, isSuccess, txHash } = useCreate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJar(title, description);
    setTitle("");
    setDescription("");
  };

  const getButtonText = () => {
    if (isPending) return "loading...";
    return "Create Jar";
  };

  return (
    <main className="w-full flex justify-between">
      <form
        onSubmit={handleSubmit}
        className="rounded-[21px] p-8 flex flex-col w-full lg:w-[40%] md:w-[40%] shadow-2xl bg-[#FFF]/20"
      >
        <div className="flex flex-col">
          <label htmlFor="jar-username" className="mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
            className="p-3 mb-6 border border-white/20 rounded-lg bg-transparent"
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="jar-username" className="mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="write a description"
            className="p-3 mb-6 border border-white/20 rounded-lg bg-transparent h-32"
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          className="bg-[#FFCB39] p-3 px-6 rounded-xl text-[#0E1D20] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending || !title || !description}
        >
          {getButtonText()}
        </button>
      </form>
    </main>
  );
};

export default Create;
