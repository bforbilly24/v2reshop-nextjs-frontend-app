'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/atoms/button'
import { ProfileModal } from '@/components/organisms/profile-modal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/atoms/navigation-menu'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/features/shopping-cart/context/cart-context'
import AnimationContainer from '@/components/atoms/animation-container'
import {
  ECOMMERCE_ACTION_LINKS,
  ECOMMERCE_NAV_LINKS,
  ECOMMERCE_NAVBAR_CONFIG,
} from '@/constant'
import { forwardRef } from 'react'

const ListItem = forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    title: string
    icon?: React.ComponentType<{ className?: string }>
    children?: React.ReactNode
    isComingSoon?: boolean
  }
>(
  (
    {
      className,
      title,
      children,
      icon: IconComponent,
      href,
      isComingSoon,
      ...props
    },
    ref
  ) => {
    if (!href) {
      return null
    }

    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors group',
              isComingSoon
                ? 'opacity-60 cursor-not-allowed hover:bg-gray-100'
                : 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className='flex items-center gap-2'>
              {IconComponent && (
                <IconComponent
                  className={cn(
                    'h-4 w-4',
                    isComingSoon ? 'text-gray-400' : 'text-primary-600'
                  )}
                />
              )}
              <div
                className={cn(
                  'text-sm font-medium leading-none',
                  isComingSoon
                    ? 'text-gray-500'
                    : 'text-gray-900 group-hover:text-primary-600'
                )}
              >
                {title}{' '}
                {isComingSoon && <span className='text-xs'>(Coming Soon)</span>}
              </div>
            </div>
            <p className='line-clamp-1 text-sm leading-snug text-muted-foreground'>
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'

interface NavbarDesktopProps {
    visible: boolean;
    setCartDrawerOpen: (open: boolean) => void;
}

export function NavbarDesktop({ visible, setCartDrawerOpen }: NavbarDesktopProps) {
    const router = useRouter()
    const pathname = usePathname()
    const { data: session } = useSession()
    const { cartItems } = useCart()
    const isAboutUsNotScrolled = pathname === '/about-us' && !visible
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

    const handleNavigation = (href: string) => {
        if (href === '/shopping-cart') {
            setCartDrawerOpen(true)
        } else if (href === '/profile') {
            setIsProfileModalOpen(true)
        } else if (href === '/logout') {
            signOut({ callbackUrl: '/auth/login' })
        } else {
            router.push(href)
        }
    }

    return (
        <motion.div
            animate={{
                width: visible ? '1280px' : '100%',
                y: visible ? 20 : 0,
            }}
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 40,
            }}
            className={cn(
                'hidden lg:flex bg-transparent self-start items-center justify-between py-4 rounded-none relative z-[999] mx-auto w-full backdrop-blur-md',
                visible &&
                    'bg-white/80 shadow-xl backdrop-blur-3xl py-3 border rounded-lg border-white/200'
            )}
        >
            <div className='flex items-center justify-between w-full h-full mx-auto px-4 lg:px-20'>
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
                            className={cn(
                                'h-auto w-[120px] lg:h-[48px] lg:w-[161px]',
                                isAboutUsNotScrolled && 'brightness-0 invert'
                            )}
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
                                                        className={cn(
                                                            'bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent',
                                                            isAboutUsNotScrolled
                                                                ? 'text-white hover:text-slate-200 data-[state=open]:text-white'
                                                                : 'text-gray-900 hover:text-primary-600',
                                                            pathname.startsWith(link.href) && link.href !== '/' && 'font-bold',
                                                            pathname === '/' && link.href === '/' && 'font-bold'
                                                        )}
                                                    >
                                                        {link.title}
                                                    </NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                                                            {link.menu.map((item) => (
                                                                <ListItem
                                                                    key={item.title}
                                                                    title={item.title}
                                                                    href={item.href}
                                                                    icon={item.icon}
                                                                    isComingSoon={item.isComingSoon}
                                                                >
                                                                    {item.tagline}
                                                                </ListItem>
                                                            ))}
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </>
                                            ) : (
                                                <Link href={link.href} legacyBehavior passHref>
                                                    <NavigationMenuLink
                                                        className={cn(
                                                            'group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                                                            isAboutUsNotScrolled
                                                                ? 'text-white hover:text-slate-200 focus:text-slate-200'
                                                                : 'text-gray-900 hover:text-primary-600 focus:text-primary-600',
                                                            pathname === link.href && 'font-bold'
                                                        )}
                                                    >
                                                        {link.title}
                                                    </NavigationMenuLink>
                                                </Link>
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
                                                ? 'text-white hover:text-slate-200 hover:bg-transparent focus:bg-transparent'
                                                : 'text-gray-700 hover:text-primary-600 hover:bg-transparent focus:bg-transparent'
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
                                                        ? 'text-white hover:text-slate-200 hover:bg-transparent focus:bg-transparent'
                                                        : 'text-gray-700 hover:text-primary-600 hover:bg-transparent focus:bg-transparent'
                                                )}
                                            >
                                                {item.icon && <item.icon className='size-5' />}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='w-min rounded-xl bg-white/80 backdrop-blur-md p-2 shadow-xl border border-white/20'>
                                            {session ? (
                                                // Show Profile & Logout when logged in
                                                <>
                                                    <DropdownMenuItem
                                                        onClick={() => handleNavigation('/profile')}
                                                        className='cursor-pointer rounded-lg'
                                                    >
                                                        <div className='flex items-center gap-2'>
                                                            {item.icon && <item.icon className='size-4' />}
                                                            <span>Profile</span>
                                                        </div>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleNavigation('/logout')}
                                                        className='cursor-pointer rounded-lg'
                                                    >
                                                        <div className='flex items-center gap-2'>
                                                            {item.icon && <item.icon className='size-4' />}
                                                            <span>Logout</span>
                                                        </div>
                                                    </DropdownMenuItem>
                                                </>
                                            ) : (
                                                // Show Login & Register when not logged in
                                                item.menu.map((subItem) => (
                                                    <DropdownMenuItem
                                                        key={subItem.title}
                                                        onClick={() => handleNavigation(subItem.href)}
                                                        className='cursor-pointer rounded-lg'
                                                    >
                                                        <div className='flex items-center gap-2'>
                                                            {subItem.icon && (
                                                                <subItem.icon className='size-4' />
                                                            )}
                                                            <span>{subItem.title}</span>
                                                        </div>
                                                    </DropdownMenuItem>
                                                ))
                                            )}
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
                                                ? 'text-white hover:text-slate-200 hover:bg-transparent focus:bg-transparent'
                                                : 'text-gray-700 hover:text-primary-600 hover:bg-transparent focus:bg-transparent'
                                        )}
                                    >
                                        {item.icon && <item.icon className='size-5' />}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </AnimationContainer>
            </div>

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </motion.div>
    )
}
