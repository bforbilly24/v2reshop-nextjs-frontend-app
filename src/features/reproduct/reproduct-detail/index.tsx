'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/utils/format-price'
import { Badge } from '@/components/atoms/badge'
import { Card } from '@/components/atoms/card'
import { DynamicBreadcrumb } from '@/components/atoms/dynamic-breadcrumb'
import { Icon } from '@/components/atoms/icon'
import Wrapper from '@/components/atoms/wrapper'
import { JsonLd } from '@/components/seo/json-ld'
import { ProductThumbSlider } from '@/features/reproduct/components/organisms/product-thumb-slider'
import { addToCart as addToCartAPI } from '@/features/shopping-cart/actions'
import { useCart } from '@/features/shopping-cart/context/cart-context'
import { useCartFeedback } from '@/features/shopping-cart/context/cart-feedback-context'
import { getProductReviews } from './actions'
import { ProductDetailSkeleton } from './components/atoms/product-detail-skeleton'
import { ReProductCartSection } from './components/organisms/reproduct-cart-section'
import { ReProductColorSection } from './components/organisms/reproduct-color-section'
import { ReProductReviewsSection } from './components/organisms/reproduct-reviews-section'
import { ReProductSizeSection } from './components/organisms/reproduct-size-section'
import { ProductDetail, Review } from './types'

interface ReProductDetailViewProps {
  product: ProductDetail
}

const ReProductDetailView: React.FC<ReProductDetailViewProps> = ({
  product,
}) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { refreshCart } = useCart()
  const { showSuccess, showError } = useCartFeedback()
  const [quantity, setQuantity] = useState(1)
  const [isClient, setIsClient] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [initialLoading, setInitialLoading] = useState(true)

  const colors = useMemo(
    () => product.variants?.['COLOR'] || [],
    [product.variants]
  )
  const sizes = useMemo(
    () => product.variants?.['SIZE'] || [],
    [product.variants]
  )

  const defaultColor = colors.length > 0 ? colors[0].value : 'Default'
  const defaultSize = sizes.length > 0 ? sizes[0].value : 'Default'

  const [selectedColor, setSelectedColor] = useState(defaultColor)
  const [selectedSize, setSelectedSize] = useState(defaultSize)
  const [currentStock, setCurrentStock] = useState(0)

  useEffect(() => {
    setIsClient(true)
    // Set initial loading to false after client mount
    setTimeout(() => setInitialLoading(false), 100)
  }, [])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getProductReviews(product.id)
        if (result.status) {
          setReviews(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      }
    }

    fetchReviews()
  }, [product.id])

  const handleReviewAdded = async () => {
    try {
      const result = await getProductReviews(product.id)
      if (result.status) {
        setReviews(result.data)
      }
    } catch (error) {
      console.error('Failed to refresh reviews:', error)
    }
  }

  useEffect(() => {
    let stock = 0
    if (product.variants) {
      const sizeVariant = sizes.find((s) => s.value === selectedSize)
      const colorVariant = colors.find((c) => c.value === selectedColor)

      if (sizes.length > 0 && colors.length > 0) {
        const sizeStock = sizeVariant ? sizeVariant.stock : 0
        const colorStock = colorVariant ? colorVariant.stock : 0
        stock = Math.min(sizeStock, colorStock)
      } else if (sizes.length > 0) {
        stock = sizeVariant ? sizeVariant.stock : 0
      } else if (colors.length > 0) {
        stock = colorVariant ? colorVariant.stock : 0
      } else {
        stock = product.in_stock ? 100 : 0
      }
    } else {
      stock = product.in_stock ? 100 : 0
    }
    setCurrentStock(stock)
  }, [selectedSize, selectedColor, sizes, colors, product])

  const compositeId = `${product.id}-${selectedColor}-${selectedSize}`

  const handleAddToCart = async () => {
    if (status === 'loading') {
      return
    }

    if (status === 'unauthenticated' || !session) {
      toast.error('Please login to add items to cart')
      setTimeout(() => {
        router.push('/auth/login')
      }, 1000)
      return
    }

    try {
      setIsAddingToCart(true)

      if (!product.id || !product.name || !product.price) {
        throw new Error('Invalid product data')
      }

      const result = await addToCartAPI({
        product_id: product.id,
        quantity: quantity,
      })

      if (result.status) {
        // Refresh cart untuk update drawer secara real-time
        await refreshCart()

        const cartItemData = {
          id: compositeId,
          productId: product.id.toString(),
          name: product.name,
          price:
            product.discount_price > 0 ? product.discount_price : product.price,
          image:
            product.images && product.images.length > 0
              ? product.images[0]
              : '/images/placeholder.jpg',
          deliveryDate: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          quantity,
          description: product.description || 'No description available',
          color: selectedColor,
          size: selectedSize,
        }

        if (isClient) {
          showSuccess(cartItemData)
          setQuantity(1)
        }
      } else {
        if (isClient) {
          showError(result.message || 'Failed to add to cart')
        }
      }
    } catch (error) {
      if (isClient) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred'
        console.error('Failed to add to cart:', errorMessage)
        showError(errorMessage)
      }
    } finally {
      setIsAddingToCart(false)
    }
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0

  const breadcrumbItems = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Products',
      href: '/reproduct',
    },
    {
      label: product.category?.name || 'Category',
      href: `/reproduct?category=${product.category?.id}`,
    },
    {
      label: product.name,
      href: `/reproduct/${product.slug}`,
      active: true,
    },
  ]

  if (initialLoading) {
    return (
      <section id='re-product-detail' className='w-full relative'>
        <Wrapper className='py-8 lg:py-28'>
          <ProductDetailSkeleton />
        </Wrapper>
      </section>
    )
  }

  return (
    <section className='w-full relative'>
      <JsonLd
        type='product'
        data={{
          name: product.name,
          description: product.description,
          images: product.images,
          price: product.price,
          final_price: product.final_price,
          in_stock: product.in_stock,
          slug: product.slug,
          rating_count: product.rating_count,
          sold_count: product.sold_count,
        }}
      />
      <JsonLd
        type='breadcrumb'
        data={{
          items: breadcrumbItems.map((item) => ({
            name: item.label,
            url: item.href,
          })),
        }}
      />
      <Wrapper className='py-8 lg:py-28'>
        <DynamicBreadcrumb
          items={breadcrumbItems}
          className='mb-6 hidden lg:flex'
        />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Left Column - Image Slider */}
          <div className='w-full'>
            <ProductThumbSlider product={product} />
          </div>

          {/* Right Column - Product Details */}
          <div className='flex flex-col space-y-6'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Badge variant='secondary' className='text-blue-600 bg-blue-50'>
                  {product.category?.name}
                </Badge>
                {product.is_allow_custom && (
                  <Badge className='bg-emerald-500 hover:bg-emerald-600'>
                    Customizable
                  </Badge>
                )}
              </div>

              <h1 className='text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white'>
                {product.name}
              </h1>

              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                  <Icon
                    icon='ph:star-fill'
                    className='w-5 h-5 text-yellow-400'
                  />
                  <span className='font-medium'>
                    {averageRating.toFixed(1)}
                  </span>
                  <span className='text-gray-500 text-sm'>
                    ({reviews.length} reviews)
                  </span>
                </div>
                <div className='w-px h-4 bg-gray-300' />
                <span
                  className={cn(
                    'font-medium text-sm',
                    currentStock > 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {currentStock > 0
                    ? `In Stock (${currentStock})`
                    : 'Out of Stock'}
                </span>
                <div className='w-px h-4 bg-gray-300' />
                <span className='text-gray-500 text-sm'>
                  {product.sold_count}+ sold
                </span>
              </div>
            </div>

            <div className='flex items-end gap-3'>
              <span className='text-2xl lg:text-3xl font-bold text-primary'>
                {formatPrice(
                  product.discount_price > 0
                    ? product.discount_price
                    : product.price
                )}
              </span>
              {product.discount_price > 0 && (
                <div className='flex flex-col mb-1'>
                  <span className='text-sm text-red-500 font-medium'>
                    {Math.round(
                      ((product.price - product.discount_price) /
                        product.price) *
                        100
                    )}
                    % OFF
                  </span>
                  <del className='text-gray-400 text-sm'>
                    {formatPrice(product.price)}
                  </del>
                </div>
              )}
            </div>

            <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
              {product.description}
            </p>

            <div className='space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800'>
              {/* Color Selection */}
              {colors.length > 0 && (
                <ReProductColorSection
                  colors={colors.map((c) => c.value)}
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                />
              )}

              {/* Size Selection */}
              {sizes.length > 0 && (
                <ReProductSizeSection
                  sizes={sizes.map((s) => s.value)}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                />
              )}

              {/* Actions */}
              <ReProductCartSection
                quantity={quantity}
                setQuantity={setQuantity}
                onAddToCart={handleAddToCart}
                stock={currentStock}
                isLoading={isAddingToCart}
              />

              {/* Additional Info */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6'>
                <Card className='p-4 bg-gray-50 dark:bg-gray-800/50 border-none'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm'>
                      <Icon icon='ph:truck' className='w-5 h-5 text-blue-500' />
                    </div>
                    <div>
                      <p className='text-sm font-medium'>Free Delivery</p>
                      <p className='text-xs text-gray-500'>Orders over</p>
                    </div>
                  </div>
                </Card>
                <Card className='p-4 bg-gray-50 dark:bg-gray-800/50 border-none'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm'>
                      <Icon
                        icon='ph:shield-check'
                        className='w-5 h-5 text-green-500'
                      />
                    </div>
                    <div>
                      <p className='text-sm font-medium'>1 Year Warranty</p>
                      <p className='text-xs text-gray-500'>100% Authentic</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-16'>
          <ReProductReviewsSection
            productId={product.id}
            averageRating={averageRating}
            reviews={reviews}
            onReviewAdded={handleReviewAdded}
          />
        </div>
      </Wrapper>
    </section>
  )
}

export { ReProductDetailView }
