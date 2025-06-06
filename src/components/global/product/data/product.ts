import { faker } from '@faker-js/faker'

faker.seed(123)

type ProductItem = {
  id: string
  img: string
  category: string
  customized: boolean
  name: string
  desc: string
  rating: string
  price: string
  oldPrice: string
  percent: string
  brand: string
}

const PRODUCTS: ProductItem[] = [
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/classical-black-tshirt.png',
    category: 'men',
    customized: true,
    name: 'Classical Black T-Shirt Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt.',
    rating: '4.8',
    price: '412.900',
    oldPrice: '700.000',
    percent: '25%',
    brand: 'apple',
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/black-t-shirt.png',
    category: 'men',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.8',
    price: '12.000',
    oldPrice: '700.000',
    percent: '25%',
    brand: 'apex',
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/check-shirt.png',
    category: 'Furniture',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.8',
    price: '112.000',
    oldPrice: '700.000',
    percent: '5%',
    brand: 'easy',
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/gray-jumper.png',
    category: 'Furniture',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.8',
    price: '12.000',
    oldPrice: '700.000',
    percent: '15%',
    brand: 'pixel',
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/gray-t-shirt.png',
    category: 'baby',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.8',
    price: '12.000',
    oldPrice: '700.000',
    percent: '15%',
    brand: 'apex',
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/red-t-shirt.png',
    category: 'Furniture',
    customized: true,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.8',
    price: '12.000',
    oldPrice: '700.000',
    percent: '65%',
    brand: 'apple',
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/red-t-shirt.png',
    category: 'Furniture',
    customized: true,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.8',
    price: '12.000',
    oldPrice: '700.000',
    percent: '10%',
    brand: 'easy',
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/yellow-frok.png',
    category: 'Furniture',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.8',
    price: '12.000',
    oldPrice: '700.000',
    percent: '25%',
    brand: 'pixel',
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/yellow-jumper.png',
    category: 'furniture',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.8',
    price: '12.000',
    oldPrice: '700.000',
    percent: '30%',
    brand: 'samsung',
  },
]

type CategoryItem = {
  label: string
  value: string
  count: string
}

const CATEGORIES: CategoryItem[] = [
  { label: 'All', value: 'all', count: '9724' },
  { label: 'Men', value: 'men', count: '1312' },
  { label: 'Furniture', value: 'Furniture', count: '3752' },
  { label: 'Child', value: 'child', count: '985' },
  { label: 'Baby', value: 'baby', count: '745' },
  { label: 'Footwear', value: 'footwear', count: '1280' },
  { label: 'Furniture', value: 'furniture', count: '820' },
  { label: 'Mobile', value: 'mobile', count: '2460' },
]

type BrandItem = {
  label: string
  value: string
  count: string
}

const BRANDS: BrandItem[] = [
  { label: 'Apple', value: 'apple', count: '9724' },
  { label: 'Apex', value: 'apex', count: '1312' },
  { label: 'Easy', value: 'easy', count: '3752' },
  { label: 'Pixel', value: 'pixel', count: '985' },
  { label: 'Samsung', value: 'samsung', count: '2460' },
]

type PriceItem = {
  label: string
  value: {
    min: number
    max: number
  }
  count: string
}

const PRICES: PriceItem[] = [
  {
    label: '0 - 199.000',
    value: {
      min: 0,
      max: 199,
    },
    count: '9724',
  },
  {
    label: '200.000 - 449.000',
    value: {
      min: 200,
      max: 499,
    },
    count: '1312',
  },
  {
    label: '450.000 - 599.000',
    value: {
      min: 450,
      max: 599,
    },
    count: '3752',
  },
  {
    label: '600.000 - 799.000',
    value: {
      min: 600,
      max: 799,
    },
    count: '985',
  },
  {
    label: '800.000 & Above',
    value: {
      min: 800,
      max: 1000,
    },
    count: '745',
  },
]

type RatingItem = {
  name: number
  value: number
  count: string
}

const RATINGS: RatingItem[] = [
  { name: 5, value: 5, count: '9724' },
  { name: 4, value: 4, count: '1312' },
  { name: 3, value: 3, count: '3752' },
  { name: 2, value: 2, count: '985' },
  { name: 1, value: 1, count: '2460' },
]

type SelectOptionItem = {
  value: string
  label: string
}

const SELECT_OPTIONS: SelectOptionItem[] = [
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

const SELECT_CATEGORIES: SelectOptionItem[] = [
  {
    value: 'option1',
    label: 'Top Rated',
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

type PaymentItem = {
  img: string
  value: string
}

const PAYMENTS: PaymentItem[] = [
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

type EcommerceNavItem = {
  label: string
  href: string
  active: boolean
  icon: string
}

// Utility functions
const getProducts = async (): Promise<ProductItem[]> => {
  return PRODUCTS
}

const getProductById = async (id: string): Promise<ProductItem | undefined> => {
  return PRODUCTS.find((product) => product.id === id)
}

const getEcommerceNav = (pathname: string): EcommerceNavItem[] => {
  return [
    {
      label: 'grid view',
      href: '/reproduct',
      icon: 'heroicons:view-columns',
      active: pathname === '/reproduct',
    },
    {
      label: 'list view',
      href: '/reproduct/list',
      icon: 'heroicons:list-bullet',
      active: pathname === '/reproduct/list',
    },
  ]
}

export {
  PRODUCTS,
  type ProductItem,
  CATEGORIES,
  type CategoryItem,
  BRANDS,
  type BrandItem,
  PRICES,
  type PriceItem,
  RATINGS,
  type RatingItem,
  SELECT_OPTIONS,
  SELECT_CATEGORIES,
  type SelectOptionItem,
  PAYMENTS,
  type PaymentItem,
  type EcommerceNavItem,
  getProducts,
  getProductById,
  getEcommerceNav,
}
