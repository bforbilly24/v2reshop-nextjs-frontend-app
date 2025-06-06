import { ReactNode } from 'react'
import { Footer } from '@/components/layouts/user/footer'
import { NavBar } from '@/components/layouts/user/navbar'

interface CoreLayoutProps {
  children: ReactNode
}

export default function CoreLayout({ children }: CoreLayoutProps) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
