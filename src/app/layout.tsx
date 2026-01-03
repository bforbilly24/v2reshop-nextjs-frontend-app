import { ReactNode } from 'react'
import { defaultMetadata } from '@/config/seo'
import { AuthProvider } from '@/providers/auth-provider'
import { BProgressProvider } from '@/providers/bprogress-provider'
import { QueryProvider } from '@/providers/query-provider'
import { SessionExpiryProvider } from '@/providers/session-expiry-provider'
import { Lato as Font } from 'next/font/google'
import { Toaster } from '@/components/atoms/sonner'
import { JsonLd } from '@/components/seo/json-ld'
import '../styles/globals.css'

const font = Font({
  weight: ['400'],
  subsets: ['latin'],
  display: 'block',
  preload: true,
})

export const metadata = defaultMetadata

export const viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  targetDensitydpi: 'device-dpi',
  themeColor: '#16a34a',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={font.className} lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/apple-icon' />
        <JsonLd type='website' />
        <JsonLd type='organization' />
      </head>
      <body>
        <AuthProvider>
          <SessionExpiryProvider>
            <QueryProvider>
              <BProgressProvider>{children}</BProgressProvider>
            </QueryProvider>
          </SessionExpiryProvider>
        </AuthProvider>
        <Toaster richColors position='top-right' theme='light' offset='100px' />
      </body>
    </html>
  )
}
