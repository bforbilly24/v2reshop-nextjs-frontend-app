'use client'

import { ServiceItem } from '@/constant'
import Image from 'next/image'
import Link from 'next/link'
import { GlowingEffect } from '@/components/ui/aceternity/glowing-effect'
import { Icon } from '@/components/ui/icon'

type ServicesProps = {
  services: ServiceItem[]
}

const ServicesSection = ({ services }: ServicesProps) => {
  return (
    <section className='w-full py-16 relative'>
      <div className='container mx-auto max-w-7xl'>
        <div className='lg:grid lg:grid-cols-12 gap-6'>
          <div className='lg:col-span-6 max-md:pt-10'>
            <div className='w-full xl:w-[490px] ml-auto'>
              <span className='text-emerald-500 text-lg uppercase mb-6 block'>
                Services
              </span>
              <h2 className='text-neutral-800 text-3xl md:text-4xl font-bold mb-12'>
                Best solutions for <br /> your dream
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className='relative flex items-start justify-between gap-x-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 group'
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <GlowingEffect
                      disabled={false}
                      proximity={40}
                      blur={1}
                      spread={15}
                      variant='default'
                      glow={false}
                      movementDuration={1.5}
                      borderWidth={2}
                      inactiveZone={0.3}
                    />
                    <div className='flex h-full items-center justify-center'>
                      <Icon
                        icon={service.icon}
                        className='size-10 text-emerald-400 group-hover:text-emerald-600 transition-colors duration-300'
                      />
                    </div>
                    <div className='flex w-full flex-col items-start justify-between h-fit gap-y-0.5'>
                      <h3 className='font-semibold text-neutral-700 text-lg group-hover:text-gray-800 transition-colors duration-300'>
                        <Link href='/projects' className='hover:underline'>
                          {service.title}
                        </Link>
                      </h3>
                      <p className='font-medium text-zinc-500 text-base group-hover:text-gray-600 transition-colors duration-300'>
                        {service.content}
                      </p>
                    </div>
                    <div className='absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-green-400 to-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    <div className='absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='lg:col-span-6'>
            <div className='relative w-full h-[679px] lg:h-full'>
              <Image
                src='/images/service/1.jpg'
                alt='Service Image'
                fill
                quality={70}
                className='object-cover rounded-lg'
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ServicesSection }
