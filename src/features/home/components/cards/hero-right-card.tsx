import React from 'react'
import { ArrowRightIcon } from 'lucide-react'

const HeroRightCard: React.FC = () => {
  return (
    <section id='card-right' className='md:absolute md:bottom-10 md:right-10'>
      <div className='flex flex-col items-start justify-center h-auto md:h-[148px] gap-y-2 w-full md:w-72 rounded-lg p-6 md:p-10 bg-white/70 backdrop-blur-lg'>
        <div className='text-xl md:text-base font-semibold leading-relaxed md:leading-[33.60px] text-primary md:text-[28px]'>
          See Our Product
        </div>
        <div className='flex flex-row items-center justify-between w-full'>
          <div className='font-medium leading-normal text-primary text-base md:text-lg'>
            Enroll Now
          </div>
          <ArrowRightIcon className='size-5 md:size-6 text-primary' />
        </div>
      </div>
    </section>
  )
}
export { HeroRightCard }
