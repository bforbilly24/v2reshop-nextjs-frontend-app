'use client'

import Image from 'next/image'
import { cn } from '@/lib/cn'
import { Marquee } from '@/components/ui/magicui/marquee'
import { PartnerItem, PARTNERS } from '@/constant'

const PartnerCard = ({ image, alt }: { image: string; alt: string }) => {
  return (
    <figure
      className={cn(
        'relative h-48 w-48 cursor-pointer overflow-hidden rounded-xl border p-4',
        // Light styles
        'border-emerald-200 bg-emerald-50/5 hover:bg-emerald-50/10',
        // Dark styles
        'dark:border-emerald-800/10 dark:bg-emerald-800/10 dark:hover:bg-emerald-800/15'
      )}
    >
      <div className='flex h-full items-center justify-center'>
        <Image
          alt={alt}
          src={image}
          width={144}
          height={144}
          className='size-36 grayscale hover:grayscale-0 transition-all duration-300'
        />
      </div>
    </figure>
  )
}

const PartnersSection: React.FC = () => {
  const firstRow = PARTNERS.slice(0, Math.ceil(PARTNERS.length / 2))
  const secondRow = PARTNERS.slice(Math.ceil(PARTNERS.length / 2))

  return (
    <div className='flex flex-col items-center justify-center gap-4 py-8'>
      <h3 className='text-3xl font-bold text-emerald-600 dark:text-emerald-400'>
        Our Trusted Partners
      </h3>
      <div className='relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:500px]'>
        <div
          className='flex flex-row items-center gap-4'
          style={{
            transform:
              'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
          }}
        >
          <Marquee pauseOnHover vertical className='[--duration:20s]'>
            {firstRow.map((partner: PartnerItem) => (
              <PartnerCard
                key={partner.id}
                image={partner.image}
                alt={partner.alt}
              />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className='[--duration:20s]'>
            {secondRow.map((partner: PartnerItem) => (
              <PartnerCard
                key={partner.id}
                image={partner.image}
                alt={partner.alt}
              />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className='[--duration:20s]'>
            {firstRow.map((partner: PartnerItem) => (
              <PartnerCard
                key={partner.id}
                image={partner.image}
                alt={partner.alt}
              />
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical className='[--duration:20s]'>
            {secondRow.map((partner: PartnerItem) => (
              <PartnerCard
                key={partner.id}
                image={partner.image}
                alt={partner.alt}
              />
            ))}
          </Marquee>
        </div>

        <div className='pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background' />
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background' />
        <div className='pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background' />
        <div className='pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background' />
      </div>
    </div>
  )
}

export { PartnersSection }
