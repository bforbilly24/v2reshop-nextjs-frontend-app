
export type PriceItem = {
  label: string
  value: {
    min: number
    max: number
  }
}

export const PRICES: PriceItem[] = [
  {
    label: '0 - 199.000',
    value: {
      min: 0,
      max: 199,
    },
  },
  {
    label: '200.000 - 449.000',
    value: {
      min: 200,
      max: 449,
    },
  },
  {
    label: '450.000 - 599.000',
    value: {
      min: 450,
      max: 599,
    },
  },
  {
    label: '600.000 - 799.000',
    value: {
      min: 600,
      max: 799,
    },
  },
  {
    label: '800.000 & Above',
    value: {
      min: 800,
      max: 10000,
    },
  },
]

export type RatingItem = {
  name: string
  value: number
}

export const RATINGS: RatingItem[] = [
  { name: '5.0+ stars', value: 5.0 },
  { name: '4.5+ stars', value: 4.5 },
  { name: '4.0+ stars', value: 4.0 },
]

export type CustomizationItem = {
  label: string
  value: boolean
}

export const CUSTOMIZATIONS: CustomizationItem[] = [
  { label: 'Customized', value: true },
  { label: 'Non-Customized', value: false },
]

export type SelectOptionItem = {
  value: string
  label: string
}

export const SELECT_OPTIONS: SelectOptionItem[] = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
  {
    value: 'option3',
    label: 'Option 3',
  },
]

export const SELECT_CATEGORIES: SelectOptionItem[] = [
  {
    value: 'newest',
    label: 'Newest First',
  },
  {
    value: 'oldest',
    label: 'Oldest First',
  },
  {
    value: 'updated_newest',
    label: 'Recently Updated',
  },
  {
    value: 'updated_oldest',
    label: 'Least Recently Updated',
  },
  {
    value: 'price_low_high',
    label: 'Price: Low to High',
  },
  {
    value: 'price_high_low',
    label: 'Price: High to Low',
  },
  {
    value: 'rating_high_low',
    label: 'Rating: High to Low',
  },
  {
    value: 'rating_low_high',
    label: 'Rating: Low to High',
  },
]

export type PaymentItem = {
  img: string
  value: string
}

export const PAYMENTS: PaymentItem[] = [
  {
    img: '/images/e-commerce/cart-icon/bkash.png',
    value: 'bkash',
  },
  {
    img: '/images/e-commerce/cart-icon/fatoorah.png',
    value: 'fatoorah',
  },
  {
    img: '/images/e-commerce/cart-icon/iyzco.png',
    value: 'instamojo',
  },
  {
    img: '/images/e-commerce/cart-icon/iyzco.png',
    value: 'iyzco',
  },
  {
    img: '/images/e-commerce/cart-icon/nagad.png',
    value: 'nagad',
  },
  {
    img: '/images/e-commerce/cart-icon/ngenious.png',
    value: 'ngenious',
  },
  {
    img: '/images/e-commerce/cart-icon/payfast.png',
    value: 'payfast',
  },
  {
    img: '/images/e-commerce/cart-icon/payku.png',
    value: 'payku',
  },
  {
    img: '/images/e-commerce/cart-icon/paypal.png',
    value: 'paypal',
  },
  {
    img: '/images/e-commerce/cart-icon/paytm.png',
    value: 'paytm',
  },
  {
    img: '/images/e-commerce/cart-icon/razoay.png',
    value: 'razoay',
  },
  {
    img: '/images/e-commerce/cart-icon/ssl.png',
    value: 'ssl',
  },
  {
    img: '/images/e-commerce/cart-icon/stripe.png',
    value: 'stripe',
  },
  {
    img: '/images/e-commerce/cart-icon/truck.png',
    value: 'truck',
  },
  {
    img: '/images/e-commerce/cart-icon/vougepay.png',
    value: 'vougepay',
  },
]
