'use client'

import { useState, useEffect } from 'react'
import { ProductItem } from '@/constant'
import { formatPrice } from '@/utils/format-price'
import { Badge } from '@/components/ui/shadcn/badge'
import { Button } from '@/components/ui/shadcn/button'
import { Card } from '@/components/ui/shadcn/card'
import Wrapper from '@/components/global/wrapper'
import { DynamicBreadcrumb } from '@/components/ui/dynamic-breadcrumb'
import { Icon } from '@/components/ui/icon'
import { ProductThumbSlider } from '@/features/reproduct/components/product/product-thumb-slider'
import { useCart } from '@/features/shopping-cart/context/cart-context'
import { useCartFeedback } from '@/features/shopping-cart/context/cart-feedback-context'
import { ReProductCartActions } from './reproduct-cart-actions'
import { ReProductColorFilter } from './reproduct-color-filter'
import { ReProductSizeFilter } from './reproduct-size-filter'
import { ReviewsSection } from './reviews-section'

interface ReProductDetailSectionProps {
  product: ProductItem
}

const ReProductDetailSection: React.FC<ReProductDetailSectionProps> = ({
  product,
}) => {
  const { addToCart, cartItems } = useCart()
  const { showSuccess, showError } = useCartFeedback()
  const [quantity, setQuantity] = useState(1)
  const [isClient, setIsClient] = useState(false)

  const defaultColor =
    product.colors && product.colors.length > 0 ? product.colors[0] : 'Black'
  const defaultSize =
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'S'
  const [selectedColor, setSelectedColor] = useState(defaultColor)
  const [selectedSize, setSelectedSize] = useState(defaultSize)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const compositeId = `${product.id}-${selectedColor}-${selectedSize}`
  const cartItem = isClient
    ? cartItems.find((item) => item.id === compositeId)
    : null

  const handleAddToCart = () => {
    try {
      if (!product.id || !product.name || !product.price) {
        throw new Error('Invalid product data')
      }

      const cartItemData = {
        id: compositeId,
        productId: product.id,
        name: product.name,
        price: parseFloat(product.price.replace(/\./g, '')),
        image: product.img || '/images/placeholder.jpg',
        deliveryDate: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        quantity,
        description: product.desc || 'No description available',
        color: selectedColor,
        size: selectedSize,
      }

      if (isClient) {
        console.debug('Adding to cart from detail:', cartItemData)
        addToCart(cartItemData)
        showSuccess(cartItemData)
        setQuantity(1)
      }
    } catch (error) {
      if (isClient) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred'
        console.error('Failed to add to cart:', errorMessage)
        showError(errorMessage)
      }
    }
  }

  const priceAsNumber = parseFloat(product.price.replace(/\./g, ''))

  const averageRating = product.reviews?.length
    ? (
        product.reviews.reduce((sum, review) => sum + review.starReview, 0) /
        product.reviews.length
      ).toFixed(1)
    : '0.0'

  const breadcrumbItems = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'ReProducts',
      href: '/reproduct',
    },
    {
      label: product.name,
      isCurrentPage: true,
    },
  ]

  if (!isClient) {
    return null
  }

  const isInCart = cartItem && cartItem.quantity > 0
  const cartQuantity = cartItem?.quantity || 0

  return (
    <Wrapper className='py-20 lg:py-32 flex flex-col gap-10'>
      <DynamicBreadcrumb items={breadcrumbItems} />
      <div className='grid grid-cols-12 md:gap-4 md:space-y-0 space-y-4 sm:space-y-4'>
        <div className='col-span-12 md:col-span-5 lg:col-span-4 space-y-4'>
          <ProductThumbSlider product={product} />
          <Card className='p-4 bg-background border-gray-200 dark:border-foreground'>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <Icon
                  icon='ph:truck'
                  className='size-5 text-green-600 flex-shrink-0'
                />
                <span className='text-sm text-foreground'>
                  Free shipping on orders over $50
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <Icon
                  icon='ph:shield-check'
                  className='size-5 text-blue-600 flex-shrink-0'
                />
                <span className='text-sm text-foreground'>
                  1 year warranty included
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <Icon
                  icon='ph:arrow-counter-clockwise'
                  className='size-5 text-purple-600'
                />
                <span className='text-sm text-foreground'>
                  30-day return policy
                </span>
              </div>
            </div>
          </Card>
        </div>
        <div className='col-span-12 md:col-span-7 lg:col-span-8 space-y-2'>
          <div className='space-y-2'>
            <h1 className='text-foreground text-xl lg:text-2xl'>
              {product.name}
            </h1>
            <div className='flex items-center gap-1.5'>
              <div className='flex items-center gap-0.5'>
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    icon='ph:star-fill'
                    className={
                      i < Math.floor(parseFloat(averageRating))
                        ? 'text-yellow-400'
                        : 'text-gray-300/80'
                    }
                  />
                ))}
              </div>
              <span className='text-muted-foreground text-sm'>
                {averageRating} ({product.reviews?.length ?? 0} reviews)
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-muted-foreground text-sm font-normal lg:text-base'>
                Available:
              </p>
              <Badge
                variant='secondary'
                className={
                  product.stock > 0
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }
              >
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </Badge>
              {isInCart && (
                <Badge variant='outline' className='ml-2'>
                  {cartQuantity} in cart
                </Badge>
              )}
            </div>
            <p className='text-sm font-normal text-muted-foreground lg:text-base'>
              {product.desc}
            </p>
          </div>
          <div className='pb-4'>
            <ReProductColorFilter
              product={product}
              color={selectedColor}
              onChange={setSelectedColor}
            />
            <ReProductSizeFilter
              product={product}
              size={selectedSize}
              onChange={setSelectedSize}
            />
          </div>
          <div className='border-t border-gray-200 dark:border-gray-700'></div>
          <div className='overflow-x-auto'>
            <div className='inline-block max-w-full align-middle'>
              <div className='overflow-hidden'>
                <table className='min-w-full'>
                  <tbody className='bg-background'>
                    <tr className='rtl:space-x-reverse'>
                      <td className='py-2 pl-0 font-normal text-muted-foreground rtl:pr-0'>
                        Price:
                      </td>
                      <td className='ml-4 py-2 flex gap-2'>
                        <span className='text-base font-semibold text-foreground lg:text-xl'>
                          {formatPrice(priceAsNumber)}
                        </span>
                        {product.oldPrice && (
                          <del className='text-base font-semibold text-muted-foreground lg:text-xl ltr:ml-2 rtl:mr-2'>
                            {formatPrice(
                              parseFloat(product.oldPrice.replace(/\./g, ''))
                            )}
                          </del>
                        )}
                        {product.percent && (
                          <Badge className='bg-destructive text-white ltr:ml-2 rtl:mr-2'>
                            <span>-{product.percent}%</span>
                          </Badge>
                        )}
                      </td>
                    </tr>
                    <ReProductCartActions
                      product={{
                        price: product.price,
                      }}
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='flex gap-4 pb-4'>
            <Button
              size='lg'
              variant='outline'
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className='w-full max-w-xs'
            >
              <Icon
                icon='eva:shopping-cart-fill'
                className='w-4 h-4 me-2 text-sm leading-none text-emerald-400'
              />
              {product.stock <= 0
                ? 'Out of Stock'
                : `Add to Cart (${quantity})`}
            </Button>
            <Button size='lg' variant='outline'>
              <Icon
                icon='octicon:heart-16'
                className='w-4 h-4 text-destructive text-sm leading-none'
              />
            </Button>
            <Button size='lg' variant='default'>
              <Icon
                icon='eva:repeat-fill'
                className='w-4 h-4 text-sm leading-none'
              />
            </Button>
          </div>
          <div className='flex items-center gap-4'>
            <Button variant='outline' size='icon' className='h-10 w-10'>
              <Icon
                icon='ph:share-network'
                className='size-5 text-purple-400'
              />
            </Button>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>Share:</span>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                <Icon
                  icon='ph:facebook-logo'
                  className='w-4 h-4 text-blue-600'
                />
              </Button>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                <Icon
                  icon='ph:twitter-logo'
                  className='w-4 h-4 text-blue-400'
                />
              </Button>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                <Icon
                  icon='ph:instagram-logo'
                  className='w-4 h-4 text-pink-500'
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ReviewsSection product={product} />
    </Wrapper>
  )
}

export { ReProductDetailSection }
