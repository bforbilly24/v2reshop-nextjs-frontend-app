'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Avatar, AvatarFallback } from '@/components/atoms/avatar'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/dialog'
import { Icon } from '@/components/atoms/icon'
import { createProductReview, deleteProductReview } from '../../actions'
import { Review } from '../../types'

interface ReProductReviewsSectionProps {
  productId: number
  averageRating: number
  reviews: Review[]
  onReviewAdded?: () => void
}

const ReProductReviewsSection: React.FC<ReProductReviewsSectionProps> = ({
  productId,
  averageRating,
  reviews,
  onReviewAdded,
}) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formattedRating = averageRating.toFixed(1)

  const handleRateProductClick = () => {
    if (!session) {
      toast.error('Please login to rate this product')
      setTimeout(() => {
        router.push('/auth/sign-in')
      }, 1000)
      return
    }
    setIsDialogOpen(true)
  }

  const handleSubmitReview = async () => {
    if (!session) {
      toast.error('Please login to write a review')
      router.push('/auth/login')
      return
    }

    if (!comment.trim()) {
      toast.error('Please write a comment')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createProductReview({
        product_id: productId,
        rating,
        comment: comment.trim(),
      })

      if (result.status) {
        toast.success('Review Submitted', {
          description: 'Thank you for your review!',
        })
        setComment('')
        setRating(5)
        setIsDialogOpen(false)
        onReviewAdded?.()
      } else {
        toast.error('Failed to Submit Review', {
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to Submit Review', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    try {
      await deleteProductReview(reviewId)
      toast.success('Review deleted successfully')
      onReviewAdded?.()
    } catch (error) {
      toast.error('Failed to delete review', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

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
                {formattedRating}
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
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400'
                        : 'text-gray-300/80'
                    }
                  />
                ))}
              </div>
              <div className='text-muted-foreground'>
                ({reviews.length} reviews)
              </div>
            </div>
          </div>
          <div className='col-span-12 md:col-span-6 flex justify-center md:justify-end items-center order-1 md:order-2'>
            <Button
              onClick={handleRateProductClick}
              className='bg-yellow-400 hover:bg-yellow-500 text-white'
            >
              Rate this product
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <div className='space-y-4'>
                  <div>
                    <label className='text-sm font-medium mb-2 block'>
                      Rating
                    </label>
                    <div className='flex gap-2'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type='button'
                          onClick={() => setRating(star)}
                          className='text-2xl'
                        >
                          <Icon
                            icon='ph:star-fill'
                            className={
                              star <= rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className='text-sm font-medium mb-2 block'>
                      Comment
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className='w-full border rounded p-3 min-h-[120px]'
                      placeholder='Share your experience with this product...'
                    />
                  </div>
                  <div className='flex gap-3'>
                    <Button
                      onClick={handleSubmitReview}
                      disabled={isSubmitting}
                      className='flex-1'
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                    <Button
                      variant='outline'
                      onClick={() => setIsDialogOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className='flex gap-3'>
              <Avatar>
                <AvatarFallback>
                  {review.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <div>
                  <div className='flex items-start justify-between'>
                    <div>
                      <p className='text-foreground font-medium text-sm lg:text-base pb-1'>
                        {review.user.name}
                      </p>
                      <p className='text-muted-foreground font-normal text-xs pb-1'>
                        {new Date(review.created_at).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </p>
                    </div>
                    {session?.user?.email === review.user.email && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDeleteReview(review.id)}
                        className='text-red-500 hover:text-red-700'
                      >
                        <Icon icon='heroicons:trash' className='w-4 h-4' />
                      </Button>
                    )}
                  </div>
                  <p className='flex items-center text-foreground font-normal text-sm lg:text-base gap-1.5 pb-3'>
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        icon='ph:star-fill'
                        className={
                          i < review.rating
                            ? 'text-yellow-400'
                            : 'text-slate-300/80'
                        }
                      />
                    ))}
                  </p>
                  <p className='pb-4 text-sm lg:text-base text-muted-foreground'>
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-muted-foreground py-8'>
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>
    </div>
  )
}

export { ReProductReviewsSection }
