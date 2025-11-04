"use client"

import React from 'react'
import { useReadContract } from 'wagmi'
import abi from '@/app/constants/abi.json'

const ViewAll = () => {
    const result = useReadContract({
        abi,
        address:  "0x4a4369E2F1E07d97F3c97b81B8Ab60bE0cb3641a",
        functionName: 'getAllJars',
      })

      console.log(result)

  return (
    <div>page</div>
  )
}

export default ViewAll