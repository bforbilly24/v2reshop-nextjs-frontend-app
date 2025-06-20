import { ReactNode } from 'react'
import '@/style/globals.css'
import { Lato as Font } from 'next/font/google'
import { BProgressProvider } from '@/providers/bprogress-provider'

const font = Font({
  weight: ['400'],
  subsets: ['latin'],
  display: 'block',
  preload: true,
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export const viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  targetDensitydpi: 'device-dpi',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={font.className}>
      <body>
        <BProgressProvider>
          {children}
        </BProgressProvider>
      </body>
    </html>
  )
}
