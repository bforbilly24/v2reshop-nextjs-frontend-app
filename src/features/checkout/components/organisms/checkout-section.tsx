'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, ChevronsUpDown } from 'lucide-react'
import { toast } from 'sonner'
import { fixWhatsAppUrl } from '@/utils/fix-whatsapp-url'
import { formatPrice } from '@/utils/format-price'
import { cn } from '@/lib/cn'
import { Button } from '@/components/atoms/button'
import { Card, CardContent } from '@/components/atoms/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/atoms/command'
import { Icon } from '@/components/atoms/icon'
import { Label } from '@/components/atoms/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/popover'
import { Stepper } from '@/components/atoms/stepper'
import { Textarea } from '@/components/atoms/textarea'
import Wrapper from '@/components/atoms/wrapper'
import { useCart } from '@/features/shopping-cart/context/cart-context'
import { checkoutCart, fetchProvinces, fetchCities, fetchKecamatan } from '../../actions'

const shippingServices = [
  { value: 'jne', label: 'JNE' },
  { value: 'jnt', label: 'J&T Express' },
  { value: 'sicepat', label: 'SiCepat' },
  { value: 'tiki', label: 'TIKI' },
  { value: 'lionparcel', label: 'Lion Parcel' },
  { value: 'pos', label: 'POS Indonesia' },
  { value: 'ninjaxpress', label: 'Ninja Xpress' },
  { value: 'anteraja', label: 'Anteraja' },
]

const CheckoutSection: React.FC = () => {
  const { cartItems, subtotal } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [checkoutData, setCheckoutData] = useState<{
    invoice: string
    whatsappUrl: string
  } | null>(null)
  const [openShipping, setOpenShipping] = useState(false)
  const [openProvince, setOpenProvince] = useState(false)
  const [openCity, setOpenCity] = useState(false)
  const [openKecamatan, setOpenKecamatan] = useState(false)
  const [provinces, setProvinces] = useState<
    Array<{ id: string; name: string }>
  >([])
  const [cities, setCities] = useState<Array<{ id: string; name: string }>>([])
  const [kecamatans, setKecamatans] = useState<Array<{ id: string; name: string }>>([])

  const [formData, setFormData] = useState({
    shipping_service: '',
    province: '',
    city: '',
    kecamatan: '',
    shipping_address: '',
    note: '',
  })

  useEffect(() => {
    const loadProvinces = async () => {
      const provincesData = await fetchProvinces()
      console.log('Provinces loaded:', provincesData)
      setProvinces(provincesData)
    }
    loadProvinces()
  }, [])

  useEffect(() => {
    if (formData.province) {
      const loadCities = async () => {
        const citiesData = await fetchCities(formData.province)
        setCities(citiesData)
      }
      loadCities()
      // Reset city and kecamatan when province changes
      setFormData((prev) => ({ ...prev, city: '', kecamatan: '' }))
    } else {
      setCities([])
    }
  }, [formData.province])

  useEffect(() => {
    if (formData.city) {
      const loadKecamatans = async () => {
        const kecamatanData = await fetchKecamatan(formData.city)
        setKecamatans(kecamatanData)
      }
      loadKecamatans()
      // Reset kecamatan when city changes
      setFormData((prev) => ({ ...prev, kecamatan: '' }))
    } else {
      setKecamatans([])
    }
  }, [formData.city])

  const steps = [
    { id: 'cart', label: 'Cart' },
    { id: 'checkout', label: 'Checkout' },
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.shipping_service) {
      toast.error('Please select a shipping service')
      return
    }

    if (!formData.province) {
      toast.error('Please select a province')
      return
    }

    if (!formData.city) {
      toast.error('Please select a city')
      return
    }

    if (!formData.kecamatan) {
      toast.error('Please select a kecamatan')
      return
    }

    if (!formData.shipping_address.trim()) {
      toast.error('Please enter your shipping address')
      return
    }

    setIsSubmitting(true)

    try {
      // Build complete address with province, city, and kecamatan
      const provinceName =
        provinces.find((p) => p.id === formData.province)?.name || ''
      const cityName = cities.find((c) => c.id === formData.city)?.name || ''
      const kecamatanName = kecamatans.find((k) => k.id === formData.kecamatan)?.name || ''
      const completeAddress = `${formData.shipping_address}, ${kecamatanName}, ${cityName}, ${provinceName}`

      const response = await checkoutCart({
        shipping_service: formData.shipping_service,
        shipping_address: completeAddress,
        note: formData.note,
      })

      if (response.status && response.data) {
        setCheckoutData({
          invoice: response.data.invoice,
          whatsappUrl: fixWhatsAppUrl(response.data.whatsapp_admin),
        })
        setCheckoutSuccess(true)
        toast.success('Checkout successful!')
      } else {
        toast.error(response.message || 'Checkout failed')
      }
    } catch (error) {
      toast.error('Failed to process checkout')
      console.error('Checkout error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (checkoutSuccess && checkoutData) {
    return (
      <Wrapper className='py-20 lg:py-32'>
        <Stepper steps={steps} activeStep='checkout' />
        <div className='mx-auto max-w-2xl flex flex-col items-center justify-center gap-y-4'>
          <div className='flex flex-row items-center justify-start w-full'>
            <Icon
              icon='heroicons:check-circle-solid'
              className='size-20 text-emerald-500'
            />
            <h2 className='text-xl font-semibold text-foreground sm:text-4xl mb-2 w-full'>
              Thanks for your order!
            </h2>
          </div>
          <p className='text-muted-foreground items-center w-full'>
            Your order{' '}
            <Link
              href={checkoutData.whatsappUrl}
              className='font-medium text-emerald-500 hover:underline'
              target='_blank'
            >
              #{checkoutData.invoice}
            </Link>{' '}
            will be processed within 24 hours during working days. We will
            notify you by email once your order has been shipped.
          </p>
          <div className='flex items-center space-x-4 w-full'>
            <Button
              asChild
              className='bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800'
            >
              <Link href={checkoutData.whatsappUrl} target='_blank'>
                Contact Admin via WhatsApp
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              className='text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-emerald-700 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 text-sm font-medium px-4 py-2'
            >
              <Link href='/reproduct'>Return to shopping</Link>
            </Button>
          </div>
          <Card className='space-y-4 sm:space-y-2 border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 w-full p-6'>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Invoice
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                {checkoutData.invoice}
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Date
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                {new Date().toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Status
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                Waiting for Admin Confirmation
              </dd>
            </dl>
          </Card>
          <div className='text-muted-foreground w-full'>
            Need anything in the meantime? You can reach us at
            <Link href='mailto:support@reshopid.com' target='_blank'>
              <span className='text-blue-600 hover:underline'>
                {' '}
                support@reshopid.com
              </span>
            </Link>
          </div>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper className='py-20 lg:py-32'>
      <Stepper steps={steps} activeStep='checkout' />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <h1 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
            Checkout
          </h1>
          <form onSubmit={handleSubmit}>
            <Card className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mb-6'>
              <CardContent className='p-6 space-y-4'>
                <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Shipping Information
                </h2>

                <div className='space-y-2'>
                  <Label htmlFor='shipping_service'>Shipping Service *</Label>
                  <Popover open={openShipping} onOpenChange={setOpenShipping}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openShipping}
                        className='w-full justify-between bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                      >
                        {formData.shipping_service
                          ? shippingServices.find(
                              (service) =>
                                service.value === formData.shipping_service
                            )?.label
                          : 'Select shipping service...'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
                      <Command>
                        <CommandInput
                          placeholder='Search shipping service...'
                          className='h-9'
                        />
                        <CommandList>
                          <CommandEmpty>No shipping service found.</CommandEmpty>
                          <CommandGroup>
                            {shippingServices.map((service) => (
                              <CommandItem
                                key={service.value}
                                value={service.value}
                                onSelect={(currentValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    shipping_service:
                                      currentValue === prev.shipping_service
                                        ? ''
                                        : currentValue,
                                  }))
                                  setOpenShipping(false)
                                }}
                              >
                                {service.label}
                                <Check
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    formData.shipping_service === service.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='province'>Province *</Label>
                  <Popover open={openProvince} onOpenChange={setOpenProvince}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openProvince}
                        className='w-full justify-between bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                      >
                        {formData.province
                          ? provinces.find((p) => p.id === formData.province)
                              ?.name
                          : 'Select province...'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
                      <Command>
                        <CommandInput
                          placeholder='Search province...'
                          className='h-9'
                        />
                        <CommandList>
                          <CommandEmpty>No province found.</CommandEmpty>
                          <CommandGroup>
                            {provinces.map((province) => (
                              <CommandItem
                                key={province.id}
                                value={province.name}
                                onSelect={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    province: province.id,
                                  }))
                                  setOpenProvince(false)
                                }}
                              >
                                {province.name}
                                <Check
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    formData.province === province.id
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='city'>City/Regency *</Label>
                  <Popover open={openCity} onOpenChange={setOpenCity}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openCity}
                        disabled={!formData.province}
                        className='w-full justify-between bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                      >
                        {formData.city
                          ? cities.find((c) => c.id === formData.city)?.name
                          : 'Select city...'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
                      <Command>
                        <CommandInput
                          placeholder='Search city...'
                          className='h-9'
                        />
                        <CommandList>
                          <CommandEmpty>No city found.</CommandEmpty>
                          <CommandGroup>
                            {cities.map((city) => (
                              <CommandItem
                                key={city.id}
                                value={city.name}
                                onSelect={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    city: city.id,
                                  }))
                                  setOpenCity(false)
                                }}
                              >
                                {city.name}
                                <Check
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    formData.city === city.id
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='kecamatan'>Kecamatan (Sub-district) *</Label>
                  <Popover open={openKecamatan} onOpenChange={setOpenKecamatan}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openKecamatan}
                        disabled={!formData.city}
                        className='w-full justify-between bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                      >
                        {formData.kecamatan
                          ? kecamatans.find((k) => k.id === formData.kecamatan)?.name
                          : 'Select kecamatan...'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
                      <Command>
                        <CommandInput
                          placeholder='Search kecamatan...'
                          className='h-9'
                        />
                        <CommandList>
                          <CommandEmpty>No kecamatan found.</CommandEmpty>
                          <CommandGroup>
                            {kecamatans.map((kecamatan) => (
                              <CommandItem
                                key={kecamatan.id}
                                value={kecamatan.name}
                                onSelect={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    kecamatan: kecamatan.id,
                                  }))
                                  setOpenKecamatan(false)
                                }}
                              >
                                {kecamatan.name}
                                <Check
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    formData.kecamatan === kecamatan.id
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='shipping_address'>
                    Street Address, Building, etc. *
                  </Label>
                  <Textarea
                    id='shipping_address'
                    name='shipping_address'
                    value={formData.shipping_address}
                    onChange={handleInputChange}
                    placeholder='Enter your complete address'
                    required
                    rows={4}
                    className='bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='note'>Note (Optional)</Label>
                  <Textarea
                    id='note'
                    name='note'
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder='Any special instructions for your order?'
                    rows={3}
                    className='bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type='submit'
              disabled={isSubmitting || cartItems.length === 0}
              className='w-full bg-emerald-600 hover:bg-emerald-700 text-white'
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </div>

        <div className='lg:col-span-1'>
          <Card className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-6'>
            <CardContent className='p-4 space-y-4'>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Order Summary
              </h2>
              <div className='space-y-2'>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex justify-between text-sm text-gray-600 dark:text-gray-300'
                  >
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>{formatPrice(item.total_price)}</span>
                  </div>
                ))}
              </div>
              <div className='border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2'>
                <div className='flex justify-between text-sm text-gray-600 dark:text-gray-300'>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className='flex justify-between font-semibold text-gray-900 dark:text-white'>
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Wrapper>
  )
}

export default CheckoutSection
