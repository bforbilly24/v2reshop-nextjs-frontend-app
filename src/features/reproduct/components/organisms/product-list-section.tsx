import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/utils/format-price'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { Card } from '@/components/atoms/card'
import { Icon } from '@/components/atoms/icon'
import { Product } from '@/features/reproduct/types'

const ProductListSection = ({ product }: { product: Product }) => {
  const averageRating = product.rating_count
    ? product.rating_count.toFixed(1)
    : '0.0'

  return (
    <Card className='p-3 rounded-md 2xl:flex lg:flex md:flex-none sm:flex-none group shadow-none border gap-x-3'>
      <Link href={`/reproduct/${product.slug}`}>
        <div className='bg-gray-100 dark:bg-gray-800 relative h-[259px] flex flex-col justify-center items-center rounded-lg mb-3 lg:mb-0 ltr:md:mr-0 ltr:sm:mr-0 rtl:md:ml-0 rtl:sm:ml-0 ltr:lg:mr-3 rtl:lg:ml-3'>
          <div className='h-[235px] w-[266px] p-12'>
            <Image
              src={
                product.image[0] ||
                'https://dummyimage.com/600x600/cccccc/ffffff&text=No+Image'
              }
              alt={product.name}
              width={235}
              height={235}
              className='h-full w-full object-contain transition-all duration-300 group-hover:scale-105'
            />
            {product.discount_price > 0 && (
              <Badge className='font-semibold bg-red-500 text-white absolute top-3 start-2'>
                {Math.round(
                  ((product.price - product.discount_price) / product.price) *
                    100
                )}
                % OFF
              </Badge>
            )}
          </div>
        </div>
      </Link>

      <div className='flex flex-col'>
        <div className='flex items-start justify-center mb-2 flex-col gap-y-2'>
          <p className='text-xs text-blue-600 font-medium uppercase'>
            {product.category?.name}
          </p>
          {product.is_allow_custom && (
            <Badge className='text-xs bg-emerald-500 hover:bg-emerald-600 text-white'>
              Customizable
            </Badge>
          )}
        </div>

        <Link href={`/reproduct/${product.slug}`}>
          <h6 className='text-gray-900 dark:text-white text-lg font-semibold line-clamp-1 pb-2'>
            {product.name}
          </h6>
          <p className='text-muted-foreground text-sm font-normal line-clamp-2 pb-4'>
            {product.description}
          </p>
        </Link>
        <p className='pb-2 space-x-2 rtl:space-x-reverse'>
          <span className='text-gray-900 dark:text-white text-lg font-bold'>
            {formatPrice(
              product.discount_price > 0
                ? product.discount_price
                : product.price
            )}
          </span>
          {product.discount_price > 0 && (
            <del className='text-gray-500 font-medium text-lg'>
              {formatPrice(product.price)}
            </del>
          )}
        </p>
        <div className='flex items-center text-gray-900 dark:text-white font-normal text-xs space-x-1 pb-3'>
          <div className='flex space-x-0.5'>
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                icon='ph:star-fill'
                className={
                  i < Math.floor(parseFloat(averageRating))
                    ? 'text-yellow-400 w-4 h-4'
                    : 'text-gray-300/80 w-4 h-4'
                }
              />
            ))}
          </div>
          <span className='pl-0.5 text-gray-500'>{averageRating}</span>
          <div className='size-1 rounded-full bg-gray-300' />
          <span className='pl-0.5 text-gray-500'>
            {product.sold_count}+ sold
          </span>
        </div>
      </div>
    </Card>
  )
}

export default ProductListSection
