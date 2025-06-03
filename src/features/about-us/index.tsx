import { Banner } from '@/components/global/banner'
import { CategoriesSliderSection } from '../home/components/categories-slider-section'
import { AboutSection } from './components/about-section'
import { FaqSection } from './components/faq-section'
import { HeroSliderSection } from './components/hero-slider-section'
import { PartnersSection } from './components/partners-section'
import { PerksSection } from './components/perks-section'
import { TestimonialsSection } from './components/testimonials-section'

const AboutUs = async () => {
  return (
    <>
      <section id='hero-slider' className='w-full'>
        <HeroSliderSection />
      </section>

      <section id='partners' className='w-full'>
        <PartnersSection />
      </section>

      <section id='about' className='w-full'>
        <AboutSection />
      </section>

      <section id='categories-slider' className='w-full py-20 lg:py-32'>
        <CategoriesSliderSection className='container mx-auto' />
      </section>

      <section id='banner' className='w-full'>
        <PerksSection />
      </section>

      <section id='hero-slider' className='w-full'>
        <FaqSection />
      </section>

      <section id='hero-slider' className='w-full'>
        <TestimonialsSection />
      </section>

      <section id='banner' className='w-full'>
        <Banner />
      </section>
    </>
  )
}

export { AboutUs }
