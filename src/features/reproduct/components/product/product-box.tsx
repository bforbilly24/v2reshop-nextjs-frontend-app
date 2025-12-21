import { ProductItem } from '@/constant'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { Card } from '@/components/atoms/card'
import { Icon } from '@/components/atoms/icon'

const ProductBox = ({ product }: { product: ProductItem }) => {
  const averageRating = product.reviews.length
    ? (
        product.reviews.reduce((sum, review) => sum + review.starReview, 0) /
        product.reviews.length
      ).toFixed(1)
    : '0.0'

  return (
    <Link href={`/reproduct/${product.id}`}>
      <Card className='p-3 rounded-md group shadow-none border h-full flex flex-col'>
        <div className='bg-gray-100 dark:bg-gray-800 relative h-[259px] flex flex-col justify-center items-center mb-3 rounded-lg'>
          <div className='h-[146px]'>
            <Image
              src={product.img}
              alt={product.name}
              width={235}
              height={235}
              className='h-full w-full object-contain transition-transform duration-300 group-hover:scale-105'
            />
            {product.percent && (
              <Badge className='font-semibold bg-red-500 text-white absolute top-3 left-3'>
                {product.percent} OFF
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

        <div className='flex flex-col flex-1'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-xs text-blue-600 font-medium uppercase'>
              {product.category}
            </p>
            {product.customized && (
              <Badge className='text-xs bg-emerald-500 hover:bg-emerald-600 text-white'>
                Customizable
              </Badge>
            )}
          </div>

          <div className='flex flex-col flex-1'>
            <div className='flex flex-col space-y-1 mb-2'>
              <h6 className='text-gray-900 dark:text-white text-lg font-semibold line-clamp-1'>
                {product.name}
              </h6>
              <p className='text-muted-foreground text-sm font-normal line-clamp-1'>
                {product.desc}
              </p>
            </div>

            <div className='flex items-center space-x-2 mb-2'>
              <span className='text-gray-900 dark:text-white text-lg font-bold'>
                Rp {product.price}
              </span>
              {product.oldPrice && (
                <del className='text-gray-500 font-medium text-lg'>
                  Rp {product.oldPrice}
                </del>
              )}
            </div>

            <div className='flex items-center text-gray-900 dark:text-white font-normal text-xs space-x-1 mb-3'>
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
              <span className='pl-0.5 text-gray-500'>30+ sold</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export { ProductBox }
