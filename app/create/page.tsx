import React from "react";

const Create = () => {
  return (
    <main className="w-full flex justify-between">
      <div className="rounded-[21px] p-8 flex flex-col w-full lg:w-[40%] md:w-[40%] shadow-2xl bg-[#FFF]/20">
        <p className="mb-2">Enter a username</p>
        <input type="text" placeholder="@0xhenchman" className="p-3 mb-6 border border-white/20 rounded-2xl" />
        <button className="bg-[#FFCB39] p-3 px-6 rounded-xl text-[#0E1D20] font-medium">
          Create Jar
        </button>
      </div>
    </main>
  );
};

export default Create;
