import { CheckoutSection } from './components/checkout-section'

const Checkout: React.FC = () => {
  return (
    <>
      <section id='checkout' className='w-full relative'>
        <CheckoutSection />
      </section>
    </>
  )
}

export { Checkout }
