"use client";

import { useReadContracts } from "wagmi";
import abi from "@/constants/abi.json";

interface Jar {
  name: string;
  description: string;
  balance: bigint;
  totalReceived: bigint;
  donorsCount: bigint;
  version: bigint;
  active: boolean;
}

interface Profile {
  handle: string;
  exists: boolean;
}

export function useGetData(address?: `0x${string}`) {
  const contractAddress = process.env
    .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  const { data, isLoading, isError, error, refetch } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi,
        functionName: "getJars",
        args: [address],
      },
      {
        address: contractAddress,
        abi,
        functionName: "getProfile",
        args: [address],
      },
    ],
    query: {
      enabled: !!address,
      staleTime: 30_000, 
      refetchInterval: 60_000, 
      refetchOnWindowFocus: true, 
      retry: 3, 
    },
  });

  const jars = (data?.[0]?.result as Jar[]) || [];
  const profile = data?.[1]?.result as [string, boolean] | undefined;

  const profileData: Profile | null = profile
    ? {
        handle: profile[0],
        exists: profile[1],
      }
    : null;

  return {
    jars,
    profile: profileData,
    isLoading,
    isError,
    error,
    refetch,
  };
}