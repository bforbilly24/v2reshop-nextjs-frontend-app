'use client'

import { ProductItem } from '@/constant'
import Image from 'next/image'
import { Avatar, AvatarImage } from '@/components/atoms/avatar'
import { Icon } from '@/components/atoms/icon'

interface ReviewsSectionProps {
  product: ProductItem
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ product }) => {
  const averageRating = product.reviews.length
    ? (
        product.reviews.reduce((sum, review) => sum + review.starReview, 0) /
        product.reviews.length
      ).toFixed(1)
    : '0.0'

  return (
    <div className='border border-solid border-1 rounded p-6'>
      <h6 className='text-foreground pb-6 text-lg lg:text-xl'>
        Reviews & Ratings
      </h6>
      <div className='space-y-12'>
        <div className='bg-accent p-6 rounded grid grid-cols-12'>
          <div className='col-span-12 items-center md:col-span-6 flex gap-3 justify-center md:justify-start order-2 md:order-1 mt-3 md:mt-0'>
            <div className='font-medium items-center flex'>
              <p className='text-foreground text-base lg:text-lg'>
                {averageRating}
              </p>
              <p className='text-muted-foreground text-sm lg:text-base'>/5</p>
            </div>
            <div className='flex items-center md:justify-start text-foreground font-normal text-sm lg:text-base'>
              <div className='flex items-center gap-1.5'>
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
              <div className='text-muted-foreground'>
                ({product.reviews.length} reviews)
              </div>
            </div>
          </div>
          <div className='col-span-12 md:col-span-6 flex justify-center md:justify-end items-center order-1 md:order-2'>
            <button
              type='button'
              className='bg-yellow-400 text-white rounded px-6 py-3 text-sm lg:text-base'
            >
              Rate this product
            </button>
          </div>
        </div>
        {product.reviews.map((review, index) => (
          <div key={index} className='flex gap-3'>
            <Avatar>
              <AvatarImage src='/images/e-commerce/productDetails/1.png' />
            </Avatar>
            <div>
              <div>
                <p className='text-foreground font-medium text-sm lg:text-base pb-1'>
                  {review.name}
                </p>
                <p className='text-muted-foreground font-normal text-xs pb-1'>
                  {review.updatedAt.toLocaleDateString()}
                </p>
                <p className='flex items-center text-foreground font-normal text-sm lg:text-base gap-1.5 pb-3'>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      icon='ph:star-fill'
                      className={
                        i < review.starReview
                          ? 'text-yellow-400'
                          : 'text-slate-300/80'
                      }
                    />
                  ))}
                </p>
                <p className='pb-4 text-sm lg:text-base text-muted-foreground'>
                  {review.descReview}
                </p>
                <div className='flex gap-2 pb-3'>
                  <p className='font-normal text-sm lg:text-base text-muted-foreground'>
                    Info:
                  </p>
                  <p className='font-medium text-sm lg:text-base text-green-400'>
                    Verified Purchase
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-12'>
                {review.imageReview && (
                  <div className='col-span-12 mb-3'>
                    <div className='flex gap-3 mb-9'>
                      {review.imageReview.slice(0, 3).map((img, imgIndex) => (
                        <div
                          key={imgIndex}
                          className='h-[90px] w-[90px] rounded bg-gray-100 p-1 overflow-hidden'
                        >
                          <Image
                            alt={`Review image ${imgIndex + 1}`}
                            height={300}
                            width={300}
                            className='h-full w-full object-contain'
                            src={img}
                          />
                        </div>
                      ))}
                    </div>
                    <div className='max-h-[400px] max-w-[346px] rounded bg-gray-100 overflow-hidden p-1'>
                      <Image
                        alt='Latest review image'
                        height={300}
                        width={300}
                        className='h-full w-full object-contain'
                        src={review.imageReview[review.imageReview.length - 1]}
                      />
                    </div>
                  </div>
                )}
                <div className='col-span-12 flex justify-end gap-4'>
                  <p className='flex items-center gap-2'>
                    <span className='cursor-pointer'>
                      <Icon icon='heroicons:hand-thumb-up' />
                    </span>
                    <span>02</span>
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='cursor-pointer'>
                      <Icon icon='carbon:reply' />
                    </span>
                    <span>00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ReviewsSection }
