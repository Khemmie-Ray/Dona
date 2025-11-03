import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
  <div className="text-center py-6 border-t border-white/20 w-[90%] mx-auto">
    <p> &copy; {year} All Rights Reserved - Dona Team</p>
   </div>
    );
};

export default Footer;
