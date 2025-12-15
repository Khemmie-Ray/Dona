import type { Metadata } from "next";
import { Poppins, Rye } from "next/font/google";
import "./globals.css";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const rye = Rye({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rye",
});

import { headers } from "next/headers";
import { Providers } from "../context/Providers";

export const metadata: Metadata = {
  title: "Dona",
  description: "Onchain support platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${rye.variable} max-w-[1550px] w-full mx-auto`}
      >
        <Providers>
          <div className="flex justify-between flex-col h-screen  w-[90%] m-auto">
            <Header />
            <div className="m-auto w-full">
              <Toaster richColors={true} position="top-right" />
              {children}
            </div>
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
