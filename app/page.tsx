"use client";

import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Home = () => {
 

  return (
    <div className="flex lg:h-screen h-auto flex-col w-full">
    <Header />
     <section className="flex justify-between  w-[90%] m-auto">
      <div className="w-full lg:w-[45%] md:w-[45%]">
        <h1 className="text-[24px] lg:text-[48px] md:text-[32px] font-bold mb-6">Your Work. Your Support. Your Control</h1>
        <p>Build a direct connection with the people who value what you create. Your tip jar lets supporters contribute to you instantly and transparently, without platforms taking a cut. It’s support that stays between you and your community — exactly how it should be.</p>
      </div>
      <div>

      </div>
     </section>
     <div className="mt-auto">
      <Footer />
      </div>
      </div>
  );
};

export default Home;
