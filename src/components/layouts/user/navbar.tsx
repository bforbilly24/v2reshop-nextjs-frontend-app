'use client'

import { useState, useRef, RefObject } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { Menu, X, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import { NAVBAR } from './data/navbar-data'

// Custom hook for click outside (you might need to implement this)
const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useState(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  })

  return ref
}

const NavBar = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: number]: boolean
  }>({})
  const router = useRouter()
  const pathname = usePathname()

  // Check if we're on about-us page and not scrolled
  const isAboutUsNotScrolled = pathname === '/about-us' && !visible

  const mobileMenuRef = useClickOutside(() => {
    if (open) setOpen(false)
  })

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

  const handleNavigation = (url: string) => {
    router.push(url)
    setOpen(false)
    setOpenDropdowns({})
  }

  const toggleDropdown = (itemId: number) => {
    setOpenDropdowns((prev) => ({ ...prev, [itemId]: !prev[itemId] }))
  }

  const mainNavItems =
    NAVBAR.navbarGroups.find((group) => group.title === 'Main')?.items || []
  const actionItems =
    NAVBAR.navbarGroups.find((group) => group.title === 'Actions')?.items || []

  return (
    <header className='fixed w-full top-0 inset-x-0 z-50' ref={ref}>
      {/* Desktop Navigation */}
      <motion.div
        animate={{
          width: visible ? '85%' : '100%',
          y: visible ? 20 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 40,
        }}
        style={{
          minWidth: '800px',
        }}
        className={cn(
          'hidden xl:flex bg-transparent self-start items-center justify-between py-4 rounded-none relative z-[999] mx-auto w-full backdrop-blur',
          visible &&
            'bg-white/80 shadow-xl backdrop-blur-3xl py-3 border rounded-full border-white/20'
        )}
      >
        <Wrapper className='flex items-center justify-between w-full px-6'>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={NAVBAR.brand.url}
              className='flex items-center cursor-pointer'
            >
              <Image
                alt={NAVBAR.brand.name}
                src='/images/brand/brand-name.png'
                width={161}
                height={48}
                className='h-auto w-[120px] xl:h-[48px] xl:w-[161px]'
              />
            </Link>
          </motion.div>

          {/* Main Navigation */}
          <div className='flex items-center justify-center gap-x-2 text-sm font-medium'>
            <AnimatePresence>
              {mainNavItems.map((item, index) => (
                <AnimationContainer
                  key={item.id}
                  animation='fadeDown'
                  delay={0.1 * index}
                >
                  <div className='relative'>
                    {item.items && item.items.length > 0 ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            className={cn(
                              'transition-all duration-500 rounded-lg px-4 py-2',
                              isAboutUsNotScrolled
                                ? 'text-white hover:text-slate-200 hover:bg-white/10'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                            )}
                          >
                            {item.title}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-[220px] rounded-xl bg-white/95 backdrop-blur-md p-2 shadow-xl border border-white/20'>
                          {item.items.map((subItem) => (
                            <DropdownMenuItem
                              key={subItem.id}
                              onClick={() => handleNavigation(subItem.url)}
                              className='rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-primary-50 cursor-pointer transition-colors'
                            >
                              {subItem.title}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link
                        href={item.url}
                        className={cn(
                          'transition-all duration-500 rounded-lg px-4 py-2 block',
                          isAboutUsNotScrolled
                            ? 'text-white hover:text-slate-200 hover:bg-white/10'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                        )}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                </AnimationContainer>
              ))}
            </AnimatePresence>
          </div>

          {/* Action Items */}
          <AnimationContainer animation='fadeLeft' delay={0.1}>
            <div className='flex items-center gap-x-2'>
              {actionItems.map((item) => (
                <div key={item.id}>
                  {item.items && item.items.length > 0 ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size='icon'
                          variant='ghost'
                          className={cn(
                            'rounded-lg transition-all duration-500',
                            isAboutUsNotScrolled
                              ? 'text-white hover:text-slate-200 hover:bg-white/10'
                              : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                          )}
                        >
                          {item.icon && <item.icon className='h-5 w-5' />}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-min rounded-xl bg-white/95 backdrop-blur-md p-2 shadow-xl border border-white/20'>
                        {item.items.map((subItem) => (
                          <DropdownMenuItem
                            key={subItem.id}
                            onClick={() => handleNavigation(subItem.url)}
                            className='rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-primary-50 cursor-pointer'
                          >
                            {subItem.title}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => handleNavigation(item.url)}
                      className={cn(
                        'rounded-lg transition-all duration-500',
                        isAboutUsNotScrolled
                          ? 'text-white hover:text-slate-200 hover:bg-white/10'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      )}
                    >
                      {item.icon && <item.icon className='h-5 w-5' />}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </AnimationContainer>
        </Wrapper>
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div
        animate={{
          y: visible ? 20 : 0,
          borderTopLeftRadius: open ? '0.75rem' : '2rem',
          borderTopRightRadius: open ? '0.75rem' : '2rem',
          borderBottomLeftRadius: open ? '0' : '2rem',
          borderBottomRightRadius: open ? '0' : '2rem',
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 50,
        }}
        className={cn(
          'flex relative flex-col xl:hidden w-full justify-between items-center mx-auto py-4 z-50',
          visible &&
            'bg-white/90 backdrop-blur-md w-11/12 border border-white/20 shadow-xl',
          open && 'border-transparent'
        )}
      >
        <div className='flex items-center justify-between w-full px-6'>
          <div className='flex items-center justify-between gap-x-4 w-full'>
            <AnimationContainer animation='fadeRight' delay={0.1}>
              <Link href={NAVBAR.brand.url}>
                <Image
                  alt={NAVBAR.brand.name}
                  src='/images/brand/brand-name.png'
                  width={120}
                  height={36}
                  className='h-auto w-[100px]'
                />
              </Link>
            </AnimationContainer>

            <AnimationContainer animation='fadeLeft' delay={0.1}>
              <div className='flex items-center justify-center gap-x-4'>
                {/* Search icon for mobile */}
                {actionItems.find((item) => item.title === 'Search') && (
                  <Button
                    size='icon'
                    variant='ghost'
                    onClick={() => handleNavigation('/search')}
                    className='text-gray-700'
                  >
                    <Search className='h-5 w-5' />
                  </Button>
                )}

                {/* Menu toggle */}
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => setOpen(!open)}
                  className='text-gray-700'
                >
                  {open ? (
                    <X className='h-6 w-6' />
                  ) : (
                    <Menu className='h-6 w-6' />
                  )}
                </Button>
              </div>
            </AnimationContainer>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='flex rounded-b-xl absolute top-16 bg-white/95 backdrop-blur-md inset-x-0 z-50 flex-col items-start justify-start gap-2 w-full px-6 py-6 shadow-xl border-t border-white/20'
            >
              {/* Main Navigation Items */}
              {mainNavItems.map((item, idx) => (
                <div key={item.id} className='w-full'>
                  <AnimationContainer
                    animation='fadeRight'
                    delay={0.1 * (idx + 1)}
                    className='w-full'
                  >
                    {item.items && item.items.length > 0 ? (
                      <div className='w-full'>
                        <Button
                          variant='ghost'
                          className='w-full justify-start text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg py-3'
                          onClick={() => toggleDropdown(item.id)}
                        >
                          {item.title}
                        </Button>
                        <AnimatePresence>
                          {openDropdowns[item.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className='ml-4 space-y-1'
                            >
                              {item.items.map((subItem) => (
                                <Button
                                  key={subItem.id}
                                  variant='ghost'
                                  onClick={() => handleNavigation(subItem.url)}
                                  className='w-full justify-start text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg py-2'
                                >
                                  {subItem.title}
                                </Button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Button
                        variant='ghost'
                        onClick={() => handleNavigation(item.url)}
                        className='w-full justify-start text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg py-3'
                      >
                        {item.title}
                      </Button>
                    )}
                  </AnimationContainer>
                </div>
              ))}

              {/* Action Items */}
              <div className='w-full border-t border-gray-200 pt-4 mt-4'>
                {actionItems
                  .filter((item) => item.title !== 'Search')
                  .map((item, idx) => (
                    <AnimationContainer
                      key={item.id}
                      animation='fadeUp'
                      delay={0.1 * (idx + 1)}
                      className='w-full'
                    >
                      {item.items && item.items.length > 0 ? (
                        <div className='w-full'>
                          <Button
                            variant='ghost'
                            className='w-full justify-start text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg py-3'
                            onClick={() => toggleDropdown(item.id)}
                          >
                            <div className='flex items-center gap-2'>
                              {item.icon && <item.icon className='h-4 w-4' />}
                              {item.title}
                            </div>
                          </Button>
                          <AnimatePresence>
                            {openDropdowns[item.id] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className='ml-6 space-y-1'
                              >
                                {item.items.map((subItem) => (
                                  <Button
                                    key={subItem.id}
                                    variant='ghost'
                                    onClick={() =>
                                      handleNavigation(subItem.url)
                                    }
                                    className='w-full justify-start text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg py-2'
                                  >
                                    {subItem.title}
                                  </Button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Button
                          variant='ghost'
                          onClick={() => handleNavigation(item.url)}
                          className='w-full justify-start text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg py-3'
                        >
                          <div className='flex items-center gap-2'>
                            {item.icon && <item.icon className='h-4 w-4' />}
                            {item.title}
                          </div>
                        </Button>
                      )}
                    </AnimationContainer>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}

export { NavBar }
