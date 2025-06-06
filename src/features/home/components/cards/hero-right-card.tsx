import React from 'react'
import { ArrowRightIcon } from 'lucide-react'

const HeroRightCard: React.FC = () => {
  return (
    <section id='card-right' className='absolute bottom-10 right-10 '>
      <div className='flex flex-col items-start justify-center h-[148px] gap-y-2 w-72 rounded-lg p-10 bg-white/70 backdrop-blur-lg'>
        <div className='text-base font-semibold leading-[33.60px] text-primary text-[28px]'>
          See Our Product
        </div>
        <div className='flex flex-row items-center justify-between w-full'>
          <div className='font-medium leading-normal text-primary text-lg'>
            Enroll Now
          </div>
          <ArrowRightIcon className='size-6 text-primary' />
        </div>
      </div>
    </section>
  )
}
export { HeroRightCard }
