"use client"

import React from 'react'
import { useGetUserData } from '@/hooks/useGetUserData'
import { useGetData } from '@/hooks/useGetData'

const Portfolio = () => {
  const { profile } = useGetData()
  console.log(profile)

  return (
    <main>
      <div>
        {/* <p>{profile[0]}</p> */}
      </div>
    </main>
  )
}

export default Portfolio