import React from 'react'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

const HeroRightCard: React.FC = () => {
  return (
    <section id='card-right' className='md:absolute md:bottom-10 md:right-10'>
      <div className='flex flex-col items-start justify-center h-auto md:h-[148px] gap-y-2 w-full md:w-72 rounded-lg p-6 md:p-10 bg-white/70 backdrop-blur-lg'>
        <div className='text-xl md:text-base font-semibold leading-relaxed md:leading-[33.60px] text-primary md:text-[28px]'>
          See Our Product
        </div>
        <Link href='/reproducts' className='flex flex-row items-center justify-between w-full group'>
          <div className='font-medium leading-normal text-foreground text-base md:text-lg group-hover:text-emerald-600 transition-colors'>
            Enroll Now
          </div>
          <ArrowRightIcon className='size-5 md:size-6 text-foreground group-hover:text-emerald-600 group-hover:translate-x-1 transition-all' />
        </Link>
      </div>
    </section>
  )
}
export { HeroRightCard }
