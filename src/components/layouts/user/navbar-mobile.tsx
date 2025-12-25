'use client'

import { useState } from 'react'
import { ECOMMERCE_NAV_LINKS, ECOMMERCE_NAVBAR_CONFIG } from '@/constant'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, User } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/cn'
import { type NavbarItem } from '@/components/layouts/user/data/navbar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/atoms/accordion'
import { Button } from '@/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu'
import { ScrollArea } from '@/components/atoms/scroll-area'
import Wrapper from '@/components/atoms/wrapper'
import { ProfileModal } from '@/components/organisms/profile-modal'
import { useCart } from '@/features/shopping-cart/context/cart-context'

interface NavbarMobileProps {
  scrolled: boolean
  onOpenCart: () => void
}

export default function NavbarMobile({
  scrolled,
  onOpenCart,
}: NavbarMobileProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string>('')
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const { cartItems: _cartItems, itemCount } = useCart()
  const pathname = usePathname()
  const isWhiteText = pathname === '/about-us' && !scrolled && !isOpen

  const handleNavigation = () => {
    setIsOpen(false)
  }

  const renderNavItem = (item: NavbarItem, level: number = 0) => {
    if (item.menu && item.menu.length > 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * level }}
          key={item.title}
        >
          <Accordion
            type='single'
            collapsible
            value={openAccordion}
            onValueChange={setOpenAccordion}
          >
            <AccordionItem value={item.title} className='border-none'>
              <AccordionTrigger className='text-foreground hover:text-primary hover:bg-accent w-full justify-between rounded-md px-2 py-3 text-left text-lg font-medium transition-colors hover:no-underline'>
                <div className='flex items-center gap-2'>
                  {item.icon && <item.icon className='h-5 w-5' />}
                  {item.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className='mt-1 ml-4 space-y-1 border-l pl-4'>
                {item.menu.map((child, index: number) => (
                  <Link
                    key={index}
                    href={child.href}
                    className='text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-2 rounded-md px-2 py-2 text-base transition-colors'
                    onClick={handleNavigation}
                  >
                    {child.icon && <child.icon className='h-4 w-4' />}
                    {child.title}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      )
    } else {
      return (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * level }}
          key={item.title}
        >
          <Link
            href={item.href}
            className='text-foreground hover:text-primary hover:bg-accent flex items-center gap-2 rounded-md px-2 py-3 text-lg font-medium transition-colors'
            onClick={handleNavigation}
          >
            {item.icon && <item.icon className='h-5 w-5' />}
            {item.title}
          </Link>
        </motion.div>
      )
    }
  }

  return (
    <>
      <header
        id='header-mobile'
        className={cn(
          'fixed top-0 right-0 left-0 z-[999] block transition-all duration-300 lg:hidden py-3',
          scrolled
            ? 'bg-background/80 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <Wrapper>
          <div className='flex items-center justify-between'>
            <Link href='/' className='flex items-center'>
              <Image
                src='/images/brand/brand-name.png'
                alt={ECOMMERCE_NAVBAR_CONFIG.brand.name}
                width={100}
                height={30}
                className={cn(
                  'h-auto w-24 object-contain',
                  isWhiteText && 'brightness-0 invert'
                )}
              />
            </Link>

            <div className='flex items-center gap-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size='icon'
                    variant='ghost'
                    className={cn(
                      'lg:hidden',
                      isWhiteText ? 'text-white' : 'text-foreground'
                    )}
                  >
                    <User className='size-5' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-min rounded-xl bg-white/80 backdrop-blur-md p-2 shadow-xl border border-white/20'>
                  {session ? (
                    <>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsProfileModalOpen(true)
                        }}
                        className='cursor-pointer rounded-lg'
                      >
                        <div className='flex items-center gap-2'>
                          <User className='size-4' />
                          <span>Profile</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => signOut({ callbackUrl: '/auth/login' })}
                        className='cursor-pointer rounded-lg'
                      >
                        <div className='flex items-center gap-2'>
                          <User className='size-4' />
                          <span>Logout</span>
                        </div>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        onClick={() => router.push('/auth/login')}
                        className='cursor-pointer rounded-lg'
                      >
                        <div className='flex items-center gap-2'>
                          <User className='size-4' />
                          <span>Login</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push('/auth/register')}
                        className='cursor-pointer rounded-lg'
                      >
                        <div className='flex items-center gap-2'>
                          <User className='size-4' />
                          <span>Register</span>
                        </div>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size='icon'
                variant='ghost'
                onClick={onOpenCart}
                className={cn(
                  'relative lg:hidden',
                  isWhiteText ? 'text-white' : 'text-foreground'
                )}
              >
                <ShoppingCart className='size-5' />
                <span className='absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full size-4 flex items-center justify-center'>
                  {itemCount}
                </span>
              </Button>
              <Button
                size='icon'
                variant='ghost'
                onClick={() => setIsOpen((v) => !v)}
                className={cn(
                  'relative z-[70] lg:hidden hover:bg-transparent focus:bg-transparent active:bg-transparent',
                  isWhiteText ? 'text-white' : 'text-foreground'
                )}
                aria-expanded={isOpen}
                aria-label='Toggle menu'
              >
                <motion.div className='absolute top-1/2 left-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform'>
                  <motion.span
                    className='absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out'
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 0 : -6,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: 'easeInOut',
                    }}
                  />

                  <motion.span
                    className='absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out'
                    animate={{
                      opacity: isOpen ? 0 : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: 'easeInOut',
                    }}
                  />

                  <motion.span
                    className='absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out'
                    animate={{
                      rotate: isOpen ? -45 : 0,
                      y: isOpen ? 0 : 6,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              </Button>
            </div>
          </div>
        </Wrapper>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden'
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className='bg-background/95 border-border fixed top-0 right-0 z-[99] h-full w-full border-l shadow-2xl backdrop-blur-xl lg:hidden'
            >
              <div className='flex h-full w-full flex-col pt-16'>
                <div className='sr-only'>Navigation Menu</div>
                <div className='sr-only'>
                  Main navigation menu with links to all sections of the website
                </div>

                {/* Scrollable Menu Area */}
                <div className='flex-1 overflow-hidden'>
                  <ScrollArea className='h-full px-6 py-4'>
                    <div className='space-y-2 pb-4'>
                      {ECOMMERCE_NAV_LINKS.map((menu, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          {renderNavItem(menu)}
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Fixed Contact Section at Bottom */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className='border-border bg-background/95 space-y-4 border-t p-6 backdrop-blur-sm'
                >
                  <div className='text-center'>
                    <h3 className='mb-1 text-base font-semibold'>
                      Hubungi Kami
                    </h3>
                    <p className='text-muted-foreground mb-3 text-sm'>
                      Konsultasi & Informasi
                    </p>
                  </div>
                  <div className='space-y-3'>
                    <Link href='/contact-us' onClick={handleNavigation}>
                      <Button
                        variant='default'
                        size='sm'
                        className='w-full font-medium transition-all hover:scale-105'
                      >
                        Hubungi Kami
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  )
}
