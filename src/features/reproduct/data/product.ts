import { faker } from '@faker-js/faker'

faker.seed(123)

type Review = {
  name: string
  updatedAt: Date
  starReview: number
  descReview: string
  imageReview?: string[]
}

type ProductItem = {
  id: string
  img: string
  images?: string[]
  category: string
  customized: boolean
  name: string
  desc: string
  price: string
  oldPrice: string
  percent: string
  createdAt: Date
  updatedAt: Date
  sizes: string[]
  colors: string[]
  stock: number
  reviews: Review[]
}

const PRODUCTS: ProductItem[] = [
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/black-t-shirt.png',
    images: [
      '/images/e-commerce/product-card/check-shirt.png',
      '/images/e-commerce/product-card/gray-jumper.png',
      '/images/e-commerce/product-card/red-t-shirt.png',
      '/images/e-commerce/product-card/yellow-jumper.png',
    ],
    category: 'Material Building',
    customized: true,
    name: 'Classical Black T-Shirt',
    desc: 'Premium cotton black T-shirt with a classic fit.',
    price: '412.900',
    oldPrice: '700.000',
    percent: '25%',
    createdAt: new Date('2025-01-15T10:30:00Z'),
    updatedAt: new Date('2025-06-01T14:20:00Z'),
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Red'],
    stock: 50,
    reviews: [
      {
        name: 'Devied Beakhum',
        updatedAt: new Date('2025-08-03'),
        starReview: 4,
        descReview:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna. Lori ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
        imageReview: [
          '/images/e-commerce/review/review-01.webp',
          '/images/e-commerce/review/review-02.webp',
          '/images/e-commerce/review/review-03.webp',
        ],
      },
      {
        name: 'Belly Johnson',
        updatedAt: new Date('2025-08-03'),
        starReview: 4.5,
        descReview:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna. Lori ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.',
      },
    ],
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/black-t-shirt.png',
    category: 'Kitchen Set',
    customized: false,
    name: 'Black Slim Fit T-Shirt',
    desc: 'Soft cotton black T-shirt with a slim fit design.',
    price: '200.000',
    oldPrice: '700.000',
    percent: '25%',
    createdAt: new Date('2025-02-20T08:15:00Z'),
    updatedAt: new Date('2025-05-15T16:45:00Z'),
    sizes: ['M', 'L'],
    colors: ['Black'],
    stock: 0,
    reviews: [
      {
        name: 'John Doe',
        updatedAt: new Date('2025-09-10'),
        starReview: 3,
        descReview:
          'Comfortable fit, but the material feels a bit thin. Decent for the price.',
        imageReview: [
          '/images/e-commerce/review/review-02.webp',
          '/images/e-commerce/review/review-01.webp',
          '/images/e-commerce/review/review-03.webp',
        ],
      },
    ],
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/check-shirt.png',
    images: [
      '/images/e-commerce/product-card/black-t-shirt.png',
      '/images/e-commerce/product-card/gray-jumper.png',
    ],
    category: 'Furniture',
    customized: false,
    name: 'Red Checkered Shirt',
    desc: 'Cotton checkered shirt with a casual style.',
    price: '112.000',
    oldPrice: '700.000',
    percent: '5%',
    createdAt: new Date('2025-03-10T12:00:00Z'),
    updatedAt: new Date('2025-06-05T09:30:00Z'),
    sizes: ['S', 'L', 'XL'],
    colors: ['Red', 'Yellow'],
    stock: 0,
    reviews: [
      {
        name: 'Jane Smith',
        updatedAt: new Date('2025-07-15'),
        starReview: 1,
        descReview: 'Not as expected, the color faded after one wash.',
      },
    ],
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/gray-jumper.png',
    category: 'Furniture',
    customized: false,
    name: 'Gray Jumper',
    desc: 'Cozy cotton gray jumper for cool weather.',
    price: '12.000',
    oldPrice: '700.000',
    percent: '15%',
    createdAt: new Date('2025-01-25T15:45:00Z'),
    updatedAt: new Date('2025-04-20T11:10:00Z'),
    sizes: ['M', 'L', 'XL'],
    colors: ['Orange'],
    stock: 30,
    reviews: [
      {
        name: 'Alice Johnson',
        updatedAt: new Date('2025-10-01'),
        starReview: 5,
        descReview: 'Super cozy and warm, perfect for cold days!',
        imageReview: [
          '/images/e-commerce/reviews/review5.png',
          '/images/e-commerce/reviews/review6.png',
        ],
      },
    ],
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/gray-t-shirt.png',
    images: [
      '/images/e-commerce/product-card/check-shirt.png',
      '/images/e-commerce/product-card/black-t-shirt.png',
    ],
    category: 'Material Building',
    customized: false,
    name: 'Gray T-Shirt',
    desc: 'Lightweight cotton gray T-shirt for everyday wear.',
    price: '12.000',
    oldPrice: '700.000',
    percent: '15%',
    createdAt: new Date('2025-04-05T07:20:00Z'),
    updatedAt: new Date('2025-05-30T14:55:00Z'),
    sizes: ['S', 'M'],
    colors: ['Pink', 'Black'],
    stock: 15,
    reviews: [
      {
        name: 'Bob Wilson',
        updatedAt: new Date('2025-11-20'),
        starReview: 4,
        descReview: 'Great everyday shirt, fits well and looks good.',
      },
    ],
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/red-t-shirt.png',
    images: [
      '/images/e-commerce/product-card/check-shirt.png',
      '/images/e-commerce/product-card/yellow-jumper.png',
    ],
    category: 'Kitchen Set',
    customized: true,
    name: 'Red T-Shirt',
    desc: 'Vibrant cotton red T-shirt with a relaxed fit.',
    price: '12.000',
    oldPrice: '700.000',
    percent: '65%',
    createdAt: new Date('2025-02-14T09:30:00Z'),
    updatedAt: new Date('2025-06-03T17:25:00Z'),
    sizes: ['S', 'M', 'L'],
    colors: ['Red'],
    stock: 25,
    reviews: [
      {
        name: 'Emma Brown',
        updatedAt: new Date('2025-12-05'),
        starReview: 5,
        descReview: 'Love the vibrant color and comfortable fit!',
        imageReview: ['/images/e-commerce/reviews/review7.png'],
      },
    ],
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/red-t-shirt.png',
    images: [
      '/images/e-commerce/product-card/check-shirt.png',
      '/images/e-commerce/product-card/yellow-jumper.png',
    ],
    category: 'Kitchen Set',
    customized: true,
    name: 'Red Classic T-Shirt',
    desc: 'Bold cotton red T-shirt for a standout look.',
    price: '800.000',
    oldPrice: '1.000.000',
    percent: '10%',
    createdAt: new Date('2025-03-22T14:10:00Z'),
    updatedAt: new Date('2025-05-25T10:40Z'),
    sizes: ['L', 'XL'],
    colors: ['Red', 'Pink'],
    stock: 10,
    reviews: [
      {
        name: 'Michael Lee',
        updatedAt: new Date('2025-08-20'),
        starReview: 4,
        descReview: 'Nice shirt, but sizing runs a bit large.',
        imageReview: [
          '/images/e-commerce/reviews/review8.png',
          '/images/e-commerce/reviews/review9.png',
          '/images/e-commerce/reviews/review10.png',
        ],
      },
    ],
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/check-shirt.png',
    images: [
      '/images/e-commerce/product-card/red-t-shirt.png',
      '/images/e-commerce/product-card/gray-jumper.png',
    ],
    category: 'Furniture',
    customized: false,
    name: 'Yellow Frock',
    desc: 'Bright cotton yellow frock with a summery vibe.',
    price: '1.200.000',
    oldPrice: '2.000.000',
    percent: '25%',
    createdAt: new Date('2025-01-30T11:50:00Z'),
    updatedAt: new Date('2025-04-18T15:35:00Z'),
    sizes: ['S', 'M'],
    colors: ['Yellow', 'Black'],
    stock: 5,
    reviews: [
      {
        name: 'Sarah Davis',
        updatedAt: new Date('2025-06-25'),
        starReview: 4,
        descReview: 'Perfect for summer, very bright and cheerful.',
      },
    ],
  },
  {
    id: faker.string.uuid(),
    img: '/images/e-commerce/product-card/yellow-jumper.png',
    images: [
      '/images/e-commerce/product-card/check-shirt.png',
      '/images/e-commerce/product-card/red-t-shirt.png',
    ],
    category: 'Kitchen Set',
    customized: false,
    name: 'Yellow Jumper',
    desc: 'Sunny cotton yellow jumper for a cheerful style.',
    price: '12.000',
    oldPrice: '700.000',
    percent: '30%',
    createdAt: new Date('2025-04-12T16:25:00Z'),
    updatedAt: new Date('2025-06-07T08:15:00Z'),
    sizes: ['M', 'L', 'XL'],
    colors: ['Yellow', 'Orange'],
    stock: 40,
    reviews: [
      {
        name: 'Chris Evans',
        updatedAt: new Date('2025-07-30'),
        starReview: 4,
        descReview: 'Really nice jumper, keeps me warm and stylish.',
        imageReview: [
          '/images/e-commerce/reviews/review11.png',
          '/images/e-commerce/reviews/review12.png',
        ],
      },
    ],
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
  { name: '5.0+ stars', value: 5.0, count: '0' },
  { name: '4.5+ stars', value: 4.5, count: '0' },
  { name: '4.0+ stars', value: 4.0, count: '0' },
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

  const getAverageRating = (product: ProductItem) => {
    return product.reviews.length
      ? product.reviews.reduce((sum, review) => sum + review.starReview, 0) /
          product.reviews.length
      : 0
  }

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
        (a, b) => getAverageRating(b) - getAverageRating(a)
      )
    case 'rating_low_high':
      return sortedProducts.sort(
        (a, b) => getAverageRating(a) - getAverageRating(b)
      )
    default:
      // Default sort by rating (highest first)
      return sortedProducts.sort(
        (a, b) => getAverageRating(b) - getAverageRating(a)
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
