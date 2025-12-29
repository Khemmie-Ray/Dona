"use client";

import React from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { PiTipJarFill } from "react-icons/pi";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  return (
    <header className="flex items-center w-[95%] mx-auto py-8 justify-between border-b border-white/20">
      <Link
        href="/"
        className="flex items-center font-rye uppercase text-[20px]"
      >
        <PiTipJarFill className="text-[#FFCB39] text-2xl" /> Dona
      </Link>

      {isConnected && (
        <nav className="flex justify-between items-center w-1/3">
          <Link href="/create">Create</Link>
          <Link href="/viewAll" className="cursor-pointer">
            View All
          </Link>
          <Link href="/portfolio">Portfolio</Link>
        </nav>
      )}
      {!isConnected ? (
        <button
          className="bg-[#FFCB39] p-3 px-6 rounded-xl text-[#0E1D20] font-medium"
          onClick={openConnectModal}
        >
          Connect Wallet
        </button>
      ) : (
        <ConnectButton />
      )}
    </header>
  );
};

export default Header;