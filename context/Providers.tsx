"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { baseSepolia, base, sepolia, arbitrumSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

const metadata = {
  name: "Dona",
  description: "A decentralized tip jar project",
  url: "http://localhost:3000/",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const config = getDefaultConfig({
  appName: "Dona",
  projectId,
  chains: [baseSepolia, base, sepolia, arbitrumSepolia],
  ssr: true,
});

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Providers;