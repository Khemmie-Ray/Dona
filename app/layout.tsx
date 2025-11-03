import type { Metadata } from 'next'
import { Poppins, Rye } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], 
});

const rye = Rye({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rye',
});

import { headers } from 'next/headers' 
import ContextProvider from './context'

export const metadata: Metadata = {
  title: 'Dona',
  description: 'Onchain support platform'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  const headersObj = await headers();
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en">
      <body className={`${poppins.className} ${rye.variable} max-w-[1550px] w-full mx-auto`}>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  )
}