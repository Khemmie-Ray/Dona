"use client";

import { useReadContracts } from "wagmi";
import abi from "@/constants/abi.json";
import { useChainId } from "wagmi";
import { TIPJAR_ADDRESSES, isSupportedChain } from "@/constants/contract";

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
  const chainId = useChainId();
  const contractAddress = chainId ? TIPJAR_ADDRESSES[chainId] : undefined;

  const { data, isLoading, isError, error, refetch } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi,
        functionName: "getUserCount",
        args: [],
      },
      {
        address: contractAddress,
        abi,
        functionName: "getTotalJarCount",
        args: [],
      },
      {
        address: contractAddress,
        abi,
        functionName: "getJarCount",
        args: [address],
      },
      {
        address: contractAddress,
        abi,
        functionName: "getAllJarsWithOwners",
        args: [],
      },
      {
        address: contractAddress,
        abi,
        functionName: "getUserProfile",
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

  const userCount = (data?.[0]?.result as bigint) || 0;
  const totalJarCount = (data?.[1]?.result as bigint) || 0;
  const jars = (data?.[2]?.result as Jar[]) || [];
  const profileResult = data?.[3]?.result as [string, boolean] | undefined;

  const profile: Profile | null = profileResult
    ? {
        handle: profileResult[0],
        exists: profileResult[1],
      }
    : null;

  return {
    userCount: Number(userCount),
    totalJarCount: Number(totalJarCount),
    jars,
    profile,
    isLoading,
    isError,
    error,
    refetch,
  };
}
