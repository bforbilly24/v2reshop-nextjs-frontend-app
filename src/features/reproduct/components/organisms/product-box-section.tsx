import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/utils/format-price'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/atoms/card'
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

const ProductBoxSection = ({ product }: { product: Product }) => {
  const averageRating = product.rating_count
    ? product.rating_count.toFixed(1)
    : '0.0'

  return (
    <Link href={`/reproduct/${product.slug}`}>
      <Card className='gap-4 rounded-md group shadow-none border h-full flex flex-col overflow-hidden'>
        <CardHeader className='p-0'>
          <div className='bg-gray-100 dark:bg-gray-800 relative lg:h-64 md:h-64 h-52 flex flex-col justify-center items-center rounded-lg'>
            <div className='h-[146px]'>
              <Image
                src={getValidImageUrl(product.image?.[0])}
                alt={product.name}
                width={235}
                height={235}
                className='h-full w-full object-contain transition-transform duration-300 group-hover:scale-105'
              />
              {product.discount_price > 0 && (
                <Badge className='font-semibold bg-red-500 text-white absolute top-3 left-3 hidden lg:flex'>
                  {Math.round(
                    ((product.price - product.discount_price) / product.price) *
                      100
                  )}
                  % OFF
                </Badge>
              )}
              {product.is_allow_custom && (
                <Badge className='font-semibold bg-emerald-500 text-white absolute bottom-3 left-3'>
                  Customizable
                </Badge>
              )}
              <div className='hidden lg:flex flex-col items-end invisible absolute end-2 top-2 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 gap-2'>
                <Button
                  size='icon'
                  variant='secondary'
                  className='rounded-full h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white'
                >
                  <Icon icon='heroicons:heart' className='w-4 h-4' />
                </Button>
                <Button
                  size='icon'
                  variant='secondary'
                  className='rounded-full h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white'
                >
                  <Icon icon='heroicons:eye' className='w-4 h-4' />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <div className='flex flex-col gap-y-0 items-center justify-center w-full'>
          <CardContent className='flex flex-col flex-1 w-full lg:p-3 md:p-3 p-1.5 pt-0'>
            <div className='flex items-center justify-between mb-2'>
              <p className='text-xs text-blue-600 font-medium uppercase'>
                {product.category?.name}
              </p>
            </div>

            <div className='flex flex-col mb-2 lg:h-auto md:h-auto h-14'>
              <h6 className='text-gray-900 dark:text-white lg:text-lg md:text-lg text-base font-semibold lg:line-clamp-1 md:line-clamp-1 line-clamp-2 mb-1'>
                {product.name}
              </h6>
              <p className='text-muted-foreground text-sm font-normal hidden lg:line-clamp-2 md:line-clamp-2'>
                {product.description}
              </p>
            </div>

            <div className='flex items-center gap-2 mb-2'>
              <span className='lg:text-xl md:text-xl text-base text-red-400 font-bold'>
                {formatPrice(
                  product.discount_price > 0
                    ? product.discount_price
                    : product.price
                )}
              </span>
              {product.discount_price > 0 && (
                <div className='flex items-center w-full justify-between'>
                  <del className='text-gray-400 lg:text-sm md:text-sm text-xs lg:max-w-full md:max-w-full max-w-12 truncate'>
                    {formatPrice(product.price)}
                  </del>
                  <Badge className='text-[10px] px-1.5 py-0.5 font-semibold bg-red-500/10 text-red-600 border-red-200 lg:hidden'>
                    -
                    {Math.round(
                      ((product.price - product.discount_price) /
                        product.price) *
                        100
                    )}
                    %
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className='p-3 pt-0 w-full'>
            <div className='flex items-center justify-between w-full text-gray-900 dark:text-white font-normal text-xs space-x-1'>
              <div className='flex flex-row items-center justify-center gap-x-1'>
                <Icon
                  icon='ph:star-fill'
                  className='text-yellow-400 w-4 h-4 lg:hidden'
                />
                <div className='hidden lg:flex space-x-0.5'>
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
              </div>
              <div className='size-1 rounded-full bg-gray-300' />
              <span className='pl-0.5 text-gray-500'>
                {product.sold_count}+ sold
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  )
}

export default ProductBoxSection
