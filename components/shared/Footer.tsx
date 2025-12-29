import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
  <footer className="text-center py-6 border-t border-white/20 w-[95%] mx-auto">
    <p> &copy; {year} All Rights Reserved - Dona Team</p>
   </footer>
    );
};

export default Footer;
