import { ContactSection } from './components/contact-section'
import { GetInTouchSection } from './components/get-in-touch-section'
import { MapSection } from './components/map-section'

const ContactUs: React.FC = () => {
  return (
    <>
      <section id='contact' className='w-full'>
        <ContactSection />
      </section>
      <section id='map' className='w-full'>
        <MapSection />
      </section>
      <section id='get-in-touch-form' className='w-full'>
        <GetInTouchSection />
      </section>
    </>
  )
}
export { ContactUs }
