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
  createdAt: Date
  updatedAt: Date
}

const PRODUCTS: ProductItem[] = [
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/classical-black-tshirt.png',
    category: 'Material Building',
    customized: true,
    name: 'Classical Black T-Shirt Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt.',
    rating: '5.0',
    price: '412.900',
    oldPrice: '700.000',
    percent: '25%',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-06-01T14:20:00Z'),
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/black-t-shirt.png',
    category: 'Kitchen Set',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '2.8',
    price: '12.000',
    oldPrice: '700.000',
    percent: '25%',
    createdAt: new Date('2024-02-20T08:15:00Z'),
    updatedAt: new Date('2024-05-15T16:45:00Z'),
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/check-shirt.png',
    category: 'Furniture',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '1.0',
    price: '112.000',
    oldPrice: '700.000',
    percent: '5%',
    createdAt: new Date('2024-03-10T12:00:00Z'),
    updatedAt: new Date('2024-06-05T09:30:00Z'),
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/gray-jumper.png',
    category: 'Furniture',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.2',
    price: '12.000',
    oldPrice: '700.000',
    percent: '15%',
    createdAt: new Date('2024-01-25T15:45:00Z'),
    updatedAt: new Date('2024-04-20T11:10:00Z'),
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/gray-t-shirt.png',
    category: 'Material Building',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '3.9',
    price: '12.000',
    oldPrice: '700.000',
    percent: '15%',
    createdAt: new Date('2024-04-05T07:20:00Z'),
    updatedAt: new Date('2024-05-30T13:55:00Z'),
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/red-t-shirt.png',
    category: 'Kitchen Set',
    customized: true,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.7',
    price: '12.000',
    oldPrice: '700.000',
    percent: '65%',
    createdAt: new Date('2024-02-14T09:30:00Z'),
    updatedAt: new Date('2024-06-03T17:25:00Z'),
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/red-t-shirt.png',
    category: 'Kitchen Set',
    customized: true,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.6',
    price: '800.000',
    oldPrice: '1.000.000',
    percent: '10%',
    createdAt: new Date('2024-03-22T14:10:00Z'),
    updatedAt: new Date('2024-05-25T10:40:00Z'),
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/yellow-frok.png',
    category: 'Furniture',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.3',
    price: '1.200.000',
    oldPrice: '2.000.000',
    percent: '25%',
    createdAt: new Date('2024-01-30T11:50:00Z'),
    updatedAt: new Date('2024-04-18T15:35:00Z'),
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/yellow-jumper.png',
    category: 'Kitchen Set',
    customized: false,
    name: 'Classical Black T-Shirt',
    desc: 'The best cotton black branded shirt',
    rating: '4.1',
    price: '12.000',
    oldPrice: '700.000',
    percent: '30%',
    createdAt: new Date('2024-04-12T16:25:00Z'),
    updatedAt: new Date('2024-06-07T08:15:00Z'),
  },
]

type CategoryItem = {
  label: string
  value: string
  count: string
}

const CATEGORIES: CategoryItem[] = [
  { label: 'All', value: 'all', count: '9' },
  { label: 'Kitchen Set', value: 'Kitchen Set', count: '4' },
  { label: 'Furniture', value: 'Furniture', count: '3' },
  { label: 'Material Building', value: 'Material Building', count: '2' },
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
    count: '6',
  },
  {
    label: '200.000 - 449.000',
    value: {
      min: 200,
      max: 449,
    },
    count: '1',
  },
  {
    label: '450.000 - 599.000',
    value: {
      min: 450,
      max: 599,
    },
    count: '0',
  },
  {
    label: '600.000 - 799.000',
    value: {
      min: 600,
      max: 799,
    },
    count: '0',
  },
  {
    label: '800.000 & Above',
    value: {
      min: 800,
      max: 10000,
    },
    count: '2',
  },
]

type RatingItem = {
  name: string
  value: number
  count: string
}

const RATINGS: RatingItem[] = [
  { name: '5.0+ stars', value: 5.0, count: '1' },
  { name: '4.5+ stars', value: 4.5, count: '4' },
  { name: '4.0+ stars', value: 4.0, count: '8' },
  { name: '3.8+ stars', value: 3.8, count: '9' },
]

type CustomizationItem = {
  label: string
  value: boolean
  count: string
}

const CUSTOMIZATIONS: CustomizationItem[] = [
  { label: 'Customized', value: true, count: '3' },
  { label: 'Non-Customized', value: false, count: '6' },
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

const sortProducts = (
  products: ProductItem[],
  sortBy: string
): ProductItem[] => {
  const sortedProducts = [...products]

  switch (sortBy) {
    case 'newest':
      return sortedProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    case 'oldest':
      return sortedProducts.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    case 'updated_newest':
      return sortedProducts.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    case 'updated_oldest':
      return sortedProducts.sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      )
    case 'price_low_high':
      return sortedProducts.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\./g, ''))
        const priceB = parseFloat(b.price.replace(/\./g, ''))
        return priceA - priceB
      })
    case 'price_high_low':
      return sortedProducts.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\./g, ''))
        const priceB = parseFloat(b.price.replace(/\./g, ''))
        return priceB - priceA
      })
    case 'rating_high_low':
      return sortedProducts.sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      )
    case 'rating_low_high':
      return sortedProducts.sort(
        (a, b) => parseFloat(a.rating) - parseFloat(b.rating)
      )
    default:
      // Default sort by rating (highest first)
      return sortedProducts.sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      )
  }
}

export {
  PRODUCTS,
  type ProductItem,
  CATEGORIES,
  type CategoryItem,
  PRICES,
  type PriceItem,
  RATINGS,
  type RatingItem,
  CUSTOMIZATIONS,
  type CustomizationItem,
  SELECT_OPTIONS,
  SELECT_CATEGORIES,
  type SelectOptionItem,
  PAYMENTS,
  type PaymentItem,
  type EcommerceNavItem,
  getProducts,
  getProductById,
  getEcommerceNav,
  sortProducts,
}
