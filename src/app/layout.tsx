import { ReactNode } from 'react'
import { defaultMetadata } from '@/config/seo'
import { AuthProvider } from '@/providers/auth-provider'
import { BProgressProvider } from '@/providers/bprogress-provider'
import { QueryProvider } from '@/providers/query-provider'
import { Lato as Font } from 'next/font/google'
import { Toaster } from '@/components/atoms/sonner'
import { JsonLd } from '@/components/seo/json-ld'
import '../style/globals.css'

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
        <JsonLd type='website' />
        <JsonLd type='organization' />
      </head>
      <body>
        <AuthProvider>
          <QueryProvider>
            <BProgressProvider>{children}</BProgressProvider>
          </QueryProvider>
        </AuthProvider>
        <Toaster richColors position='top-right' theme='light' offset='100px' />
      </body>
    </html>
  )
}
