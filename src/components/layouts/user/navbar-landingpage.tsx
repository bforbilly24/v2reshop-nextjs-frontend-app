'use client'

import { useState, useRef, RefObject } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ShoppingCartDrawer } from '@/features/shopping-cart/components/shopping-cart-drawer'
import { NavbarDesktop } from './navbar-desktop'
import NavbarMobile from './navbar-mobile'

export function NavbarLandingPage() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const router = useRouter()

  const { scrollY } = useScroll({
    target: ref as RefObject<HTMLDivElement>,
    offset: ['start start', 'end start'],
  })

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 100) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  })

  const handleNavigateToCartFromDrawer = () => {
    setCartDrawerOpen(false)
    router.push('/shopping-cart')
  }

  return (
    <header className='fixed w-full top-0 inset-x-0 z-50' ref={ref}>
      <NavbarDesktop visible={visible} setCartDrawerOpen={setCartDrawerOpen} />
      <NavbarMobile
        scrolled={visible}
        onOpenCart={() => setCartDrawerOpen(true)}
      />
      <ShoppingCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onNavigateToCart={handleNavigateToCartFromDrawer}
      />
    </header>
  )
}
