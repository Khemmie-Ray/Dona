"use client";

import React from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { PiTipJarFill } from "react-icons/pi";
import Link from "next/link";
import { useAppKitAccount } from "@reown/appkit/react";

const Header = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAppKitAccount();
  console.log(isConnected)

  return (
    <header className="flex items-center w-[90%] mx-auto py-8 justify-between border-b border-white/20">
      <h1 className="flex items-center font-rye uppercase text-[20px]">
        <PiTipJarFill className="text-[#FFCB39] text-2xl" /> Dona
      </h1>

      {isConnected && <nav className="flex justify-between items-center w-1/3">
        <Link href="/create">Create</Link>
        <Link href="/viewAll" className="cursor-pointer">View All</Link>
        <Link href="/portfolio">Portfolio</Link>
      </nav>}
      {!isConnected ? <button
        className="bg-[#FFCB39] p-3 px-6 rounded-xl text-[#0E1D20] font-medium"
        onClick={openConnectModal}
      >
        Connect Wallet
      </button> : <w3m-button />}
    </header>
  );
};

export default Header;
