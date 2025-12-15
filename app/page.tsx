"use client";

import React from "react";
import Profile from "../components/home/Profile";

const Home = () => {
  return (
    <main className="">
      <div className="w-full lg:w-[45%] md:w-[45%]">
        <h1 className="text-[24px] lg:text-[48px] md:text-[32px] font-bold mb-6">
          Your Work. Your Support. Your Control
        </h1>
        <p className="mb-8">
          Build a direct connection with the people who value what you create.
          Your tip jar lets supporters contribute to you instantly and
          transparently, without platforms taking a cut. It’s support that stays
          between you and your community — exactly how it should be.
        </p>
        <Profile />
      </div>
      <div></div>
    </main>
  );
};

export default Home;
