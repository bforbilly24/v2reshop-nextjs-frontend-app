import { faker } from '@faker-js/faker'

faker.seed(123)

export const products = [
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/classical-black-tshirt.png',
    category: 'men',
    customized: true,
    name: 'Classical Black T-Shirt Classical Black T-Shirt',
    // subtitle: 'The best cotton black branded shirt.',
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
    // subtitle: 'The best cotton black branded shirt.',
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
    // subtitle: 'The best cotton black branded shirt.',
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
    // subtitle: 'The best cotton black branded shirt.',
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
    // subtitle: 'The best cotton black branded shirt.',
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
    // subtitle: 'The best cotton black branded shirt.',
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
    // subtitle: 'The best cotton black branded shirt.',
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
    // subtitle: 'The best cotton black branded shirt.',
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
    // subtitle: 'The best cotton black branded shirt.',
    desc: 'The best cotton black branded shirt',
    rating: '4.8',
    price: '12.000',
    oldPrice: '700.000',
    percent: '30%',
    brand: 'samsung',
  },
]

export type product = (typeof products)[number]

export const getProducts = async () => {
  return products
}

export const getProductById = async (id: string) => {
  return products.find((product) => product.id === id)
}

// Rest of your code remains the same...
export const categories = [
  { label: 'All', value: 'all', count: '9724' },
  { label: 'Men', value: 'men', count: '1312' },
  { label: 'Furniture', value: 'Furniture', count: '3752' },
  { label: 'Child', value: 'child', count: '985' },
  { label: 'Baby', value: 'baby', count: '745' },
  { label: 'Footwear', value: 'footwear', count: '1280' },
  { label: 'Furniture', value: 'furniture', count: '820' },
  { label: 'Mobile', value: 'mobile', count: '2460' },
]
export type category = (typeof categories)[number]

export const brands = [
  { label: 'Apple', value: 'apple', count: '9724' },
  { label: 'Apex', value: 'apex', count: '1312' },
  { label: 'Easy', value: 'easy', count: '3752' },
  { label: 'Pixel', value: 'pixel', count: '985' },
  { label: 'Samsung', value: 'samsung', count: '2460' },
]
export type brand = (typeof brands)[number]

export const prices = [
  {
    label: '0 -.000 199.000',
    valu: {
      min: 0,
      max: 199,
    },
    count: '9724',
  },
  {
    label: '200.000 - 449.000',
    valu: {
      min: 200,
      max: 499,
    },
    count: '1312',
  },
  {
    label: '450.000 - 599.000',
    valu: {
      min: 450,
      max: 599,
    },
    count: '3752',
  },
  {
    label: '600.000 - 799.000',
    valu: {
      min: 600,
      max: 799,
    },
    count: '985',
  },
  {
    label: '800.000 & Above',
    valu: {
      min: 800,
      max: 1000,
    },
    count: '745',
  },
]
export type price = (typeof prices)[number]

export const ratings = [
  { name: 5, value: 5, count: '9724' },
  { name: 4, value: 4, count: '1312' },
  { name: 3, value: 3, count: '3752' },
  { name: 2, value: 2, count: '985' },
  { name: 1, value: 1, count: '2460' },
]
export type rating = (typeof ratings)[number]

export const selectOptions = [
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
export type selectOption = (typeof selectOptions)[number]

export const selectCategories = [
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
export type selectCategory = (typeof selectCategories)[number]

export const payments = [
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
export type payment = (typeof payments)[number]

export type EcommerceNav = {
  label: string
  href: string
  active: boolean
  icon: string
}

export function getEcommerceNav(pathname: string): EcommerceNav[] {
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
