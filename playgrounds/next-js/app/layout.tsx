import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactScanScript } from '@/components/ReactScanScript'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'react-selective-context | Next.js Playground',
  description:
    'Lightweight state management for React with App Router and Server Components',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <ReactScanScript />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
