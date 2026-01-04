'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/atoms/alert-dialog'
import { Avatar, AvatarFallback } from '@/components/atoms/avatar'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/dialog'
import { Icon } from '@/components/atoms/icon'
import { Skeleton } from '@/components/atoms/skeleton'
import { useProductReviews } from '../../hooks/use-reviews'

interface ReProductReviewsSectionProps {
  productId: number
}

const ReProductReviewsSection: React.FC<ReProductReviewsSectionProps> = ({
  productId,
}) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const {
    reviews,
    isLoading,
    createReview,
    deleteReview,
    isCreating,
    isDeleting,
  } = useProductReviews(productId)

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0

  const formattedRating = averageRating.toFixed(1)

  const userReview = reviews.find(
    (review) => review.user_id === Number(session?.user?.id)
  )
  const hasUserReviewed = !!userReview

  const handleRateProductClick = () => {
    if (!session) {
      toast.error('Please login to rate this product')
      setTimeout(() => {
        router.push('/auth/sign-in')
      }, 1000)
      return
    }
    
    if (hasUserReviewed) {
      toast.info('You have already reviewed this product')
      return
    }
    
    setIsDialogOpen(true)
  }

  const handleSubmitReview = async () => {
    if (!session) {
      toast.error('Please login to write a review')
      router.push('/auth/sign-in')
      return
    }

    if (!comment.trim()) {
      toast.error('Please write a comment')
      return
    }

    createReview(
      {
        product_id: productId,
        rating,
        comment: comment.trim(),
      },
      {
        onSuccess: (result) => {
          if (result.status) {
            setComment('')
            setRating(5)
            setIsDialogOpen(false)
          }
        },
      }
    )
  }

  const handleDeleteReview = (reviewId: number) => {
    setReviewToDelete(reviewId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteReview = () => {
    if (reviewToDelete) {
      deleteReview(reviewToDelete)
      setIsDeleteDialogOpen(false)
      setReviewToDelete(null)
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
            {isLoading ? (
              <div className='flex items-center gap-3'>
                <Skeleton className='h-6 w-20' />
                <Skeleton className='h-5 w-32' />
              </div>
            ) : (
              <>
                <div className='font-medium items-center flex'>
                  <p className='text-foreground text-base lg:text-lg'>
                    {formattedRating}
                  </p>
                  <p className='text-muted-foreground text-sm lg:text-base'>
                    /5
                  </p>
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
              </>
            )}
          </div>
          <div className='col-span-12 md:col-span-6 flex flex-col items-stretch md:items-end order-1 md:order-2 gap-2'>
            <Button
              onClick={handleRateProductClick}
              disabled={hasUserReviewed || isLoading}
              className='bg-yellow-400 hover:bg-yellow-500 text-white disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto'
            >
              {hasUserReviewed ? (
                <>
                  <Icon icon='ph:check-circle' className='w-4 h-4 mr-2' />
                  Already Reviewed
                </>
              ) : (
                'Rate this product'
              )}
            </Button>
            {hasUserReviewed && (
              <p className='text-xs text-muted-foreground text-center md:text-right'>
                You can delete your review to write a new one
              </p>
            )}
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
                      disabled={isCreating || !comment.trim()}
                      className='flex-1'
                    >
                      {isCreating ? (
                        <>
                          <Icon
                            icon='ph:spinner'
                            className='w-4 h-4 animate-spin mr-2'
                          />
                          Submitting...
                        </>
                      ) : (
                        'Submit Review'
                      )}
                    </Button>
                    <Button
                      variant='outline'
                      onClick={() => setIsDialogOpen(false)}
                      disabled={isCreating}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {isLoading ? (
          <div className='space-y-6'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='flex gap-3'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-4/5' />
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
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
                    {session?.user?.id &&
                      review.user_id === Number(session.user.id) && (
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleDeleteReview(review.id)}
                          disabled={isDeleting}
                          className='text-red-500 hover:text-red-700 hover:bg-red-50'
                        >
                          {isDeleting ? (
                            <Icon
                              icon='ph:spinner'
                              className='w-4 h-4 animate-spin'
                            />
                          ) : (
                            <Icon icon='heroicons:trash' className='w-4 h-4' />
                          )}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteReview}
              disabled={isDeleting}
              className='bg-red-600 hover:bg-red-700 focus:ring-red-600'
            >
              {isDeleting ? (
                <>
                  <Icon icon='ph:spinner' className='w-4 h-4 animate-spin mr-2' />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export { ReProductReviewsSection }
