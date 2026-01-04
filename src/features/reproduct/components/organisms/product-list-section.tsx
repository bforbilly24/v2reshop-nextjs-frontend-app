import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/utils/format-price'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { Card } from '@/components/atoms/card'
import { Icon } from '@/components/atoms/icon'
import { Product } from '@/features/reproduct/types'

const getValidImageUrl = (imageUrl: string | undefined) => {
  const defaultImage = 'https://dummyimage.com/600x600/cccccc/ffffff&text=No+Image'
  if (!imageUrl || imageUrl.trim() === '') return defaultImage
  
  try {
    new URL(imageUrl)
    return imageUrl
  } catch {
    return defaultImage
  }
}

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
              src={getValidImageUrl(product.image?.[0])}
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
            <div className='flex flex-col items-end invisible absolute end-2 top-2 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 gap-2'>
              <Button
                size='icon'
                className='rounded-full group/item hover:ring-offset-0 bg-slate-50 hover:bg-slate-50 dark:bg-slate-700 hover:ring-0'
              >
                <Icon
                  icon='ph:heart-fill'
                  className='text-slate-400 group-hover/item:text-destructive'
                />
              </Button>
              <Button
                size='icon'
                className='rounded-full group/item hover:ring-offset-0 bg-slate-50 hover:bg-slate-50 dark:bg-slate-700 hover:ring-0'
              >
                <Icon
                  icon='ph:eye'
                  className='text-slate-400 group-hover/item:text-destructive'
                />
              </Button>
              <Button
                size='icon'
                className='rounded-full group/item hover:ring-offset-0 bg-slate-50 hover:bg-slate-50 dark:bg-slate-700 hover:ring-0'
              >
                <Icon
                  icon='jam:refresh-reverse'
                  className='text-slate-400 group-hover/item:text-destructive'
                />
              </Button>
            </div>
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
