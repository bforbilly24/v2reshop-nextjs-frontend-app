'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardHeader } from '@/components/atoms/card'
import { Icon } from '@/components/atoms/icon'
import { Badge } from '@/components/atoms/badge'
import { Textarea } from '@/components/atoms/textarea'
import { joinCommunity, createCommunityPost, getMembershipStatus } from '../../actions'
import type { Community } from '../../types'
import { generateSlugWithId } from '../../utils/generate-slug'

interface ReCommunityListSectionProps {
  community: Community
  onRefresh?: () => void
}

const ReCommunityListSection: React.FC<ReCommunityListSectionProps> = ({
  community,
  onRefresh,
}) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isJoining, setIsJoining] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [memberStatus, setMemberStatus] = useState<
    'none' | 'pending' | 'approved' | 'rejected'
  >('none')
  const [isLoadingStatus, setIsLoadingStatus] = useState(true)

  // Generate slug for community
  const communitySlug =
    community.slug || generateSlugWithId(community.name, community.id)

  // Fetch membership status on component mount
  useEffect(() => {
    const fetchMembershipStatus = async () => {
      try {
        const response = await getMembershipStatus(community.id)
        if (response.success) {
          setMemberStatus(response.data.status)
        }
      } catch (error) {
        console.error('Error fetching membership status:', error)
      } finally {
        setIsLoadingStatus(false)
      }
    }

    fetchMembershipStatus()
  }, [community.id])

  const handleJoinCommunity = async () => {
    if (!session) {
      toast.error('Please login to join community')
      return
    }

    setIsJoining(true)
    try {
      const response = await joinCommunity(community.id)
      if (response.success) {
        toast.success(response.message)
        setMemberStatus(
          response.data.status as 'pending' | 'approved' | 'rejected'
        )
        onRefresh?.()
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to join community'
      )
    } finally {
      setIsJoining(false)
    }
  }

  const handleCreatePost = async () => {
    if (!session) {
      toast.error('Please login to create post')
      return
    }

    if (!postContent.trim()) {
      toast.error('Please write something')
      return
    }

    setIsPosting(true)
    try {
      const response = await createCommunityPost(community.id, {
        content: postContent,
      })
      if (response.success) {
        toast.success(response.message || 'Post created successfully')
        setPostContent('')
        onRefresh?.()
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create post'
      )
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div className='space-y-6'>
      {/* Community Header */}
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div className='space-y-2'>
              <div className='flex items-center gap-3'>
                <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center'>
                  <Icon
                    icon='heroicons:user-group-solid'
                    className='h-6 w-6 text-primary'
                  />
                </div>
                <div>
                  <h1 
                    className='text-2xl font-bold hover:text-primary cursor-pointer transition-colors'
                    onClick={() => router.push(`/recommunity/${communitySlug}`)}
                  >
                    {community.name}
                  </h1>
                  <p className='text-sm text-muted-foreground'>
                    {community.location}
                  </p>
                </div>
              </div>
              <p className='text-muted-foreground'>{community.description}</p>
            </div>
            {memberStatus === 'none' ? (
              <Button
                onClick={handleJoinCommunity}
                disabled={isJoining || isLoadingStatus}
                className='bg-emerald-500 hover:bg-emerald-600'
              >
                {isJoining ? (
                  <>
                    <Icon
                      icon='heroicons:arrow-path'
                      className='mr-2 h-4 w-4 animate-spin'
                    />
                    Joining...
                  </>
                ) : (
                  <>
                    <Icon icon='heroicons:plus' className='mr-2 h-4 w-4' />
                    Join Community
                  </>
                )}
              </Button>
            ) : memberStatus === 'pending' ? (
              <Button
                disabled={true}
                variant='outline'
                className='border-amber-200 bg-amber-50 text-amber-700 cursor-not-allowed opacity-60'
              >
                <Icon icon='heroicons:clock' className='mr-2 h-4 w-4' />
                Pending Approval
              </Button>
            ) : memberStatus === 'approved' ? (
              <Button
                disabled
                variant='outline'
                className='border-emerald-200 bg-emerald-50 text-emerald-700 cursor-not-allowed'
              >
                <Icon icon='heroicons:check-circle' className='mr-2 h-4 w-4' />
                Joined
              </Button>
            ) : (
              <Button
                disabled
                variant='outline'
                className='border-red-200 bg-red-50 text-red-700 cursor-not-allowed'
              >
                <Icon icon='heroicons:x-circle' className='mr-2 h-4 w-4' />
                Rejected
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4 text-sm'>
            <div className='flex items-center gap-2'>
              <Icon icon='heroicons:user-group' className='h-4 w-4' />
              <span>0 members</span>
            </div>
            <div className='flex items-center gap-2'>
              <Icon icon='heroicons:map-pin' className='h-4 w-4' />
              <span>{community.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Area - Dynamic based on member status */}
      {memberStatus === 'none' ? null : memberStatus === 'pending' ? null : memberStatus === 'approved' ? null : (
        /* Rejected */
        <Card className='border-red-200 bg-red-50/50'>
          <CardContent className='py-8'>
            <div className='text-center space-y-4'>
              <div className='h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto'>
                <Icon
                  icon='heroicons:x-circle'
                  className='h-8 w-8 text-red-600'
                />
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-2 text-red-900'>
                  Join request rejected
                </h3>
                <p className='text-red-700'>
                  Your request to join this community has been rejected by the
                  admin.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { ReCommunityListSection }
