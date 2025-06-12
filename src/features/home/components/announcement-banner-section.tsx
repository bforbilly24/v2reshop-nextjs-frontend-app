'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Wrapper from '@/components/global/wrapper'
import { Icon } from '@/components/ui/icon'

const AnnouncementBannerSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const bannerClosed = sessionStorage.getItem('announcement-banner-closed')
    if (!bannerClosed) {
      setIsVisible(true)
    }
    setIsLoaded(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)

    sessionStorage.setItem('announcement-banner-closed', 'true')
  }

  if (!isLoaded) {
    return null
  }

  if (!isVisible) {
    return null
  }

  return (
    <Wrapper>
      <div className='fixed z-50 flex backdrop-blur-md flex-col md:flex-row justify-between w-full p-4 -translate-x-1/2 bg-white/80 border border-gray-100 rounded-lg shadow-xs lg:max-w-7xl left-1/2 bottom-6 dark:bg-gray-700 dark:border-gray-600'>
        <div className='flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0'>
          <Link
            href='https://reshopid.com/recommunity'
            className='flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600'
          >
            <Image
              width={114}
              height={114}
              loading='lazy'
              decoding='async'
              data-nimg='1'
              src='/images/brand/brand-name.png'
              className='me-2'
              alt='Reshop Logo'
            />
          </Link>
          <p className='flex items-center gap-2 text-sm font-normal text-gray-500 dark:text-gray-400'>
            <Icon icon='noto:party-popper' className='size-4' />
            Something new! The latest UI and ReCommunity features are here for a
            better experience.
          </p>
        </div>
        <div className='flex items-center shrink-0'>
          <Link
            href='/recommunity'
            className='px-5 py-2 me-2 text-xs font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800'
          >
            Explore ReCommunity
          </Link>
          <button
            onClick={handleClose}
            type='button'
            className='shrink-0 inline-flex justify-center w-7 h-7 items-center text-muted-foreground hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white'
          >
            <Icon icon='tabler:x' className='size-4' />
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

export { AnnouncementBannerSection }
