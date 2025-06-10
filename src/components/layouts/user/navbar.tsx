'use client'

import { useState, useRef, useEffect, forwardRef, RefObject } from 'react'
import {
  ECOMMERCE_ACTION_LINKS,
  ECOMMERCE_NAV_LINKS,
  ECOMMERCE_NAVBAR_CONFIG,
} from '@/constant'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react'
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/shadcn/navigation-menu'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import { Icon } from '@/components/ui/icon'
import { ShoppingCartDrawer } from '@/features/shopping-cart/components/shopping-cart-drawer'
import { useCart } from '@/features/shopping-cart/context/cart-context'

const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [callback])
  return ref
}

const ListItem = forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string
    icon?: React.ComponentType<{ className?: string }>
  }
>(({ className, title, children, icon: IconComponent, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group',
            className
          )}
          {...props}
        >
          <div className='flex items-center gap-2'>
            {IconComponent && (
              <IconComponent className='h-4 w-4 text-primary-600' />
            )}
            <div className='text-sm font-medium leading-none text-gray-900 group-hover:text-primary-600'>
              {title}
            </div>
          </div>
          <p className='line-clamp-1 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = 'ListItem'

const NavBar = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean
  }>({})
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { cartItems } = useCart()
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

  const handleNavigation = (href: string) => {
    if (href === '/shopping-cart') {
      setCartDrawerOpen(true)
    } else {
      router.push(href)
      setOpen(false)
      setOpenDropdowns({})
    }
  }

  const handleNavigateToCartFromDrawer = () => {
    setCartDrawerOpen(false)
    router.push('/shopping-cart')
  }

  const toggleDropdown = (itemTitle: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [itemTitle]: !prev[itemTitle] }))
  }

  return (
    <header className='fixed w-full top-0 inset-x-0 z-50' ref={ref}>
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
        style={{ minWidth: '800px' }}
        className={cn(
          'hidden lg:flex bg-transparent self-start items-center justify-between py-4 rounded-none relative z-[999] mx-auto w-full backdrop-blur',
          visible &&
            'bg-white/80 shadow-xl backdrop-blur-3xl py-3 border rounded-full border-white/200'
        )}
      >
        <Wrapper className='flex items-center justify-between w-full'>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={ECOMMERCE_NAVBAR_CONFIG.brand.href}
              className='flex items-center cursor-pointer'
            >
              <Image
                alt={ECOMMERCE_NAVBAR_CONFIG.brand.name}
                src='/images/brand/brand-name.png'
                width={161}
                height={48}
                className='h-auto w-[120px] lg:h-[48px] lg:w-[161px]'
              />
            </Link>
          </motion.div>
          <div className='flex items-center justify-center text-sm font-medium'>
            <NavigationMenu>
              <NavigationMenuList className='flex items-center gap-2'>
                <AnimatePresence>
                  {ECOMMERCE_NAV_LINKS.map((link, index) => (
                    <AnimationContainer
                      key={link.title}
                      animation='fadeDown'
                      delay={0.1 * index}
                    >
                      <NavigationMenuItem>
                        {link.menu ? (
                          <>
                            <NavigationMenuTrigger
                              aria-expanded={false}
                              aria-controls={`${link.title}-menu`}
                              className={cn(
                                'transition-all duration-500 rounded-lg px-4 py-2 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent',
                                isAboutUsNotScrolled
                                  ? 'text-white hover:text-slate-200 data-[state=open]:text-slate-200 focus:!bg-white/10 hover:!bg-white/10'
                                  : 'text-gray-700 hover:text-primary-600 data-[state=open]:text-primary-600 focus:!bg-transparent hover:!bg-transparent'
                              )}
                            >
                              <Link href={link.href}>{link.title}</Link>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent id={`${link.title}-menu`}>
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ul
                                  className={cn(
                                    'grid gap-1 rounded-xl p-4 md:w-[35rem] lg:w-[40rem]',
                                    link.title === 'Explore'
                                      ? 'lg:grid-cols-[.75fr_1fr_1fr]'
                                      : 'lg:grid-cols-3'
                                  )}
                                >
                                  {link.title === 'Explore' && (
                                    <li className='relative row-span-3 overflow-hidden rounded-lg pr-2'>
                                      <div className='absolute inset-0 z-10 h-full w-full bg-[linear-gradient(to_right,rgb(38,38,38,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(38,38,38,0.5)_1px,transparent_1px)] bg-[size:1rem_1rem]'></div>
                                      <NavigationMenuLink asChild>
                                        <Link
                                          href='/explore#features'
                                          className='relative z-20 flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md'
                                        >
                                          <Image
                                            src='/images/brand/brand-name.png'
                                            alt='logo'
                                            width={161}
                                            height={48}
                                            className='h-auto w-[120px] lg:h-[40px] lg:w-[140px]'
                                          />
                                          <h6 className='mb-2 mt-4 text-lg font-medium'>
                                            All Services
                                          </h6>
                                          <p className='text-sm leading-tight text-muted-foreground'>
                                            Explore all our services to make
                                            your life easier.
                                          </p>
                                        </Link>
                                      </NavigationMenuLink>
                                    </li>
                                  )}
                                  {link.menu.map((menuItem) => (
                                    <ListItem
                                      key={menuItem.title}
                                      title={menuItem.title}
                                      href={menuItem.href}
                                      icon={menuItem.icon}
                                    >
                                      {menuItem.tagline}
                                    </ListItem>
                                  ))}
                                </ul>
                              </motion.div>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink asChild>
                            <Link
                              href={link.href}
                              className={cn(
                                'transition-all duration-500 rounded-lg px-4 py-2 block',
                                isAboutUsNotScrolled
                                  ? 'text-white hover:text-slate-200 hover:bg-white/10'
                                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                              )}
                            >
                              {link.title}
                            </Link>
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    </AnimationContainer>
                  ))}
                </AnimatePresence>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <AnimationContainer animation='fadeLeft' delay={0.1}>
            <div className='flex items-center gap-x-2'>
              {ECOMMERCE_ACTION_LINKS.map((item) => (
                <div key={item.title}>
                  {item.title === 'Cart' ? (
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => setCartDrawerOpen(true)}
                      className={cn(
                        'relative rounded-lg transition-all duration-500',
                        isAboutUsNotScrolled
                          ? 'text-white hover:text-slate-200 hover:bg-white/10'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      )}
                    >
                      <ShoppingCart className='size-5' />
                      <span className='absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full size-5 flex items-center justify-center'>
                        {cartItems.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
                      </span>
                    </Button>
                  ) : item.menu && item.menu.length > 0 ? (
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
                          {item.icon && <item.icon className='size-5' />}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-min rounded-xl bg-white/95 backdrop-blur-md p-2 shadow-xl border border-white/20'>
                        {item.menu.map((subItem) => (
                          <DropdownMenuItem
                            key={subItem.title}
                            onClick={() => handleNavigation(subItem.href)}
                            className='rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-primary-50 cursor-pointer'
                          >
                            <div className='flex items-center gap-2'>
                              {subItem.icon && (
                                <subItem.icon className='h-4 w-4' />
                              )}
                              {subItem.title}
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => handleNavigation(item.href)}
                      className={cn(
                        'rounded-lg transition-all duration-500',
                        isAboutUsNotScrolled
                          ? 'text-white hover:text-slate-200 hover:bg-white/10'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      )}
                    >
                      {item.icon && <item.icon className='size-5' />}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </AnimationContainer>
        </Wrapper>
      </motion.div>
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
          'flex relative flex-col lg:hidden w-full justify-between items-center mx-auto py-4 z-50',
          visible &&
            'bg-white/90 backdrop-blur-md w-11/12 border border-white/20 shadow-xl',
          open && 'border-transparent'
        )}
      >
        <div className='flex items-center justify-between w-full px-6'>
          <div className='flex items-center justify-between gap-x-4 w-full'>
            <AnimationContainer animation='fadeRight' delay={0.1}>
              <Link href={ECOMMERCE_NAVBAR_CONFIG.brand.href}>
                <Image
                  alt={ECOMMERCE_NAVBAR_CONFIG.brand.name}
                  src='/images/brand/brand-name.png'
                  width={120}
                  height={36}
                  className='h-auto w-[100px]'
                />
              </Link>
            </AnimationContainer>
            <AnimationContainer animation='fadeLeft' delay={0.1}>
              <div className='flex items-center justify-center gap-x-4'>
                {ECOMMERCE_ACTION_LINKS.find(
                  (item) => item.title === 'Search'
                ) && (
                  <Button
                    size='icon'
                    variant='ghost'
                    onClick={() => handleNavigation('/search')}
                    className='text-gray-700'
                  >
                    <Icon icon='lucide:search' className='size-5' />
                  </Button>
                )}
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => setCartDrawerOpen(true)}
                  className='relative text-gray-700'
                >
                  <ShoppingCart className='size-5' />
                  <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center'>
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </Button>
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
        <AnimatePresence>
          {open && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='flex rounded-b-xl absolute top-16 bg-white/95 backdrop-blur-md inset-x-0 z-50 flex-col items-start justify-start gap-2 w-full px-6 py-6 shadow-xl border-t border-white/20'
            >
              {ECOMMERCE_NAV_LINKS.map((item, idx) => (
                <div key={item.title} className='w-full'>
                  <AnimationContainer
                    animation='fadeRight'
                    delay={0.1 * (idx + 1)}
                    className='w-full'
                  >
                    {item.menu && item.menu.length > 0 ? (
                      <div className='w-full'>
                        <Button
                          variant='ghost'
                          className='w-full justify-between text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg py-3'
                          onClick={() => toggleDropdown(item.title)}
                        >
                          <span className='flex items-center gap-2'>
                            {item.icon && <item.icon className='h-4 w-4' />}
                            {item.title}
                          </span>
                          <ChevronDown
                            className={cn(
                              'size-4 transition-transform duration-200',
                              openDropdowns[item.title] && 'rotate-180'
                            )}
                          />
                        </Button>
                        <AnimatePresence>
                          {openDropdowns[item.title] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className='ml-4 space-y-1 mt-2'
                            >
                              {item.menu.map((subItem) => (
                                <motion.div
                                  key={subItem.title}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Button
                                    variant='ghost'
                                    onClick={() =>
                                      handleNavigation(subItem.href)
                                    }
                                    className='w-full justify-start text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-900 dark:hover:bg-gray-200 rounded-lg cursor-pointer py-4'
                                  >
                                    <div className='flex items-center gap-2'>
                                      {subItem.icon && (
                                        <subItem.icon className='h-4 w-4' />
                                      )}
                                      <span>{subItem.title}</span>
                                    </div>
                                  </Button>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Button
                        variant='ghost'
                        onClick={() => handleNavigation(item.href)}
                        className='w-full justify-start text-gray-700 dark:text-gray-400 hover:bg-gray-800 dark:hover:bg-gray-300 rounded-lg cursor-pointer'
                      >
                        <div className='flex items-center gap-2'>
                          {item.icon && <item.icon className='h-4 w-4' />}
                          {item.title}
                        </div>
                      </Button>
                    )}
                  </AnimationContainer>
                </div>
              ))}
              <div className='w-full border-t border-gray-200 pt-4 mt-2'></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <ShoppingCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onNavigateToCart={handleNavigateToCartFromDrawer}
      />
    </header>
  )
}

export { NavBar }
