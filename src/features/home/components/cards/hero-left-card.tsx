import React from 'react'
import { Button } from '@/components/atoms/button'
import {
  CardContainer,
  CardBody,
  CardItem,
} from '@/components/atoms/3d-card'

const HeroLeftCard: React.FC = () => {
  return (
    <section id='card-left' className='md:absolute md:left-20 md:top-0'>
      <CardContainer containerClassName='py-0'>
        <CardBody className='h-fit w-full md:w-[30rem]'>
          <CardItem translateZ='50' className='w-full'>
            <div className='flex h-fit w-full bg-white/70 backdrop-blur-lg p-6 md:p-10 flex-col rounded-lg items-center gap-y-6 md:gap-y-12'>
              <div className='flex w-full flex-col gap-y-3 md:gap-y-4'>
                <CardItem translateZ='100' className='w-full'>
                  <h2 className='text-3xl md:text-6xl text-primary leading-tight md:leading-[4.5rem]'>
                    High-Quality Items Just For You
                  </h2>
                </CardItem>
                <CardItem translateZ='60' className='w-full'>
                  <div className='text-base md:text-xl text-muted-foreground leading-relaxed md:leading-[2rem]'>
                    Our Items is made from selected and best quality materials
                    that are suitable for your dream home
                  </div>
                </CardItem>
              </div>
              <CardItem translateZ='80' className='w-full'>
                <Button className='h-14 md:h-20 w-full focus:border-emerald-500 bg-emerald-400 hover:bg-emerald-500 text-lg md:text-2xl'>
                  Shop Now
                </Button>
              </CardItem>
            </div>
          </CardItem>
        </CardBody>
      </CardContainer>
    </section>
  )
}

export { HeroLeftCard }
