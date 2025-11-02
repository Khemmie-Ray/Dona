"use client";

import React from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Home = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <>
      <button
        onClick={openConnectModal}
        type="button"
        className="bg-blue-500 p-4 rounded-xl block my-4"
      >
        Open Connect Modal
      </button>
    </>
  );
};

export default Home;
