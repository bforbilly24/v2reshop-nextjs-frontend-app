import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/shadcn/badge'
import { Button } from '@/components/ui/shadcn/button'
import { Card } from '@/components/ui/shadcn/card'
import { Icon } from '@/components/ui/icon'
import { product as ProductProps } from './data/product'
import { ProductCounterButton } from './product-counter-button'

const ProductList = ({ product }: { product: ProductProps }) => {
  return (
    <Card className='p-3 rounded-md 2xl:flex lg:flex md:flex-none sm:flex-none group shadow-none border gap-x-3'>
      <Link href={`/reproduct/${product.id}`}>
        <div className='bg-slate-200 dark:bg-primatext-primary relative h-[259px] flex flex-col justify-center items-center rounded-md mb-3 lg:mb-0 ltr:md:mr-0 ltr:sm:mr-0 rtl:md:ml-0 rtl:sm:ml-0 ltr:lg:mr-3 rtl:lg:ml-3'>
          <div className='h-[235px] w-[266px] p-12'>
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

      <div>
        <p className='text-xs text-primary font-normal uppercase pb-2'>
          {product.category}
        </p>
        <Link href={`/reproduct/${product.id}`}>
          <h6 className='text-primary text-lg font-medium pb-2 w-full line-clamp-1'>
            {product.name}
          </h6>
          <p className='text-muted-foreground text-sm font-normal line-clamp-2 pb-4'>
            {product.desc}
          </p>
        </Link>
        <p className='pb-2 space-x-2 rtl:space-x-reverse'>
          <span className='text-primary text-lg font-semibold'>
            Rp{product.price}
          </span>
          <del className='text-muted-foreground font-semibold text-lg'>
            Rp{product.oldPrice}
          </del>
        </p>
        {product.rating && (
          <div className='flex items-center text-primary font-normal text-xs space-x-1 pb-3'>
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
        <div className='flex gap-4 max-w-[370px]'>
          <ProductCounterButton />
        </div>
      </div>
    </Card>
  )
}

export { ProductList }
