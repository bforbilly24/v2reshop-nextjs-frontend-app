import { ProductItem } from '@/constant'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/shadcn/badge'
import { Button } from '@/components/ui/shadcn/button'
import { Card } from '@/components/ui/shadcn/card'
import { Icon } from '@/components/ui/icon'
import { ProductCounterButton } from './product-counter-button'

const ProductBox = ({ product }: { product: ProductItem }) => {
  return (
    <Card className='p-3 rounded-md group shadow-none border h-full flex flex-col'>
      <Link href={`/reproduct/${product.id}`}>
        <div className='bg-slate-200 dark:bg-slate-800 relative h-[259px] flex flex-col justify-center items-center rounded-md mb-3'>
          <div className='h-[146px]'>
            <Image
              src={product.img}
              alt={product.name}
              width={235}
              height={235}
              className='h-full w-full object-contain transition-all duration-300 group-hover:scale-105'
            />
            {product.percent && (
              <Badge className='font-normal bg-destructive text-white absolute start-2 top-3'>
                {product.percent}
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

      <div className='flex flex-col flex-1'>
        <div className='flex items-center justify-between mb-2'>
          <p className='text-xs text-primary font-normal uppercase'>
            {product.category}
          </p>
          {product.customized && (
            <Badge className='text-xs bg-emerald-500 hover:bg-emerald-600 text-white'>
              customizable
            </Badge>
          )}
        </div>

        <div className='flex flex-col flex-1 space-y-2'>
          <h6 className='text-primary text-lg font-medium w-full line-clamp-1'>
            <Link href={`/reproduct/${product.id}`}>{product.name}</Link>
          </h6>

          <div className='flex items-center space-x-2 mb-2'>
            <span className='text-primary text-lg font-semibold'>
              Rp{product.price}
            </span>
            {product.oldPrice && (
              <del className='text-muted-foreground font-semibold text-lg'>
                Rp{product.oldPrice}
              </del>
            )}
          </div>

          {product.rating && (
            <div className='flex items-center text-primary font-normal text-xs space-x-1 mb-3'>
              <div className='flex space-x-1'>
                <Icon icon='ph:star-fill' className='text-yellow-400' />
              </div>
              <span className='pl-0.5 text-muted-foreground'>
                {product.rating}
              </span>
              <div className='size-1 rounded-full bg-muted-foreground' />
              <span className='pl-0.5 text-muted-foreground'>30+ sold</span>
            </div>
          )}

          {/* Spacer to push button to bottom */}
          <div className='flex-1'></div>

          <div className='mt-auto'>
            <ProductCounterButton />
          </div>
        </div>
      </div>
    </Card>
  )
}

export { ProductBox }
