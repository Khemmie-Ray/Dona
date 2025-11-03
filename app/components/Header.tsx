"use client";

import React from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { PiTipJarFill } from "react-icons/pi";
import Link from "next/link";
import { useAppKitAccount } from "@reown/appkit/react";

const Header = () => {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAppKitAccount();

  return (
    <header className="flex items-center w-[90%] mx-auto py-8 justify-between">
      <h1 className="flex items-center">
        <PiTipJarFill className="text-[#FFCB39] text-2xl" /> Dona
      </h1>

      <nav className="flex justify-between items-center">
        <Link href="/create" className="mr-6">Create</Link>
        <Link href="/create" className="mr-6">View All</Link>
        <Link href="/create">portfolio</Link>
      </nav>
      <button
        className="bg-[#FFCB39] p-3 px-6 rounded-xl text-[#0E1D20] font-medium"
        onClick={openConnectModal}
      >
        Connect Wallet
      </button>
    </header>
  );
};

export default Header;
