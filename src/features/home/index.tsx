import Image from 'next/image'
import { Banner } from '@/components/global/banner'
import { CategoriesSliderSection } from './components/categories-slider-section'
import { FeaturesSection } from './components/features-section'
import { HeroSliderSection } from './components/hero-slider-section'
import { LatestProducts } from './components/latest-products'

const Home = async () => {
  return (
    <>
      <section id='background' className='w-full pt-24 relative'>
        <div className='absolute left-0 top-0 -z-10 h-full w-full bg-emerald-100' />
        <div className='absolute right-0 top-0 -z-10 bg-emerald-50 h-full w-[34rem]' />
        {/* <div className='container mx-auto'> */}
        <HeroSliderSection />
        {/* </div> */}
      </section>
      <section id='features' className='w-full relative'>
        <Image
          src={'/images/patterns/pattern-1.png'}
          alt='pattern'
          width={336}
          height={336}
          className='absolute -left-32 top-32 z-0'
        />
        <FeaturesSection />
      </section>
      <section id='categories-slider' className='w-full'>
        <CategoriesSliderSection />
      </section>
      <section id='latest-products' className='w-full'>
        <LatestProducts />
      </section>
      <section id='banner' className='w-full'>
        {/* <div className='container mx-auto'> */}
        <Banner />
        {/* </div> */}
      </section>
    </>
  )
}
export { Home }
