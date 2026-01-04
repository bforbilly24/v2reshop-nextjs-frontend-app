'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Wrapper from '@/components/atoms/wrapper'
import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardHeader } from '@/components/atoms/card'
import { Icon } from '@/components/atoms/icon'
import { Badge } from '@/components/atoms/badge'
import { Textarea } from '@/components/atoms/textarea'
import {
  getMembershipStatus,
  joinCommunity,
  createCommunityPost,
} from '../actions'
import type { Community } from '../types'

interface ReCommunityDetailProps {
  community: Community
}

const ReCommunityDetail: React.FC<ReCommunityDetailProps> = ({ community }) => {
  const { data: session } = useSession()
  const [memberStatus, setMemberStatus] = useState<
    'none' | 'pending' | 'approved' | 'rejected'
  >('none')
  const [isLoading, setIsLoading] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [isPosting, setIsPosting] = useState(false)

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
        setIsLoading(false)
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
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create post'
      )
    } finally {
      setIsPosting(false)
    }
  }

  if (isLoading) {
    return (
      <Wrapper className='py-20 lg:py-32'>
        <div className='max-w-4xl mx-auto'>
          <Card>
            <CardContent className='py-12'>
              <div className='text-center'>
                <Icon
                  icon='heroicons:arrow-path'
                  className='h-8 w-8 animate-spin mx-auto text-primary mb-4'
                />
                <p className='text-muted-foreground'>Loading community...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper className='py-20 lg:py-32'>
      <div className='max-w-4xl mx-auto space-y-6'>
        {/* Community Header */}
        <Card>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div className='space-y-2 flex-1'>
                <div className='flex items-center gap-3'>
                  <div className='h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center'>
                    <Icon
                      icon='heroicons:user-group-solid'
                      className='h-8 w-8 text-primary'
                    />
                  </div>
                  <div>
                    <h1 className='text-3xl font-bold'>{community.name}</h1>
                    <p className='text-sm text-muted-foreground flex items-center gap-2 mt-1'>
                      <Icon icon='heroicons:map-pin' className='h-4 w-4' />
                      {community.location}
                    </p>
                  </div>
                </div>
                <p className='text-muted-foreground text-lg'>
                  {community.description}
                </p>
              </div>

              {/* Join Button */}
              <div className='ml-4'>
                {memberStatus === 'none' ? (
                  <Button
                    onClick={handleJoinCommunity}
                    disabled={isJoining}
                    size='lg'
                    className='bg-emerald-500 hover:bg-emerald-600'
                  >
                    {isJoining ? (
                      <>
                        <Icon
                          icon='heroicons:arrow-path'
                          className='mr-2 h-5 w-5 animate-spin'
                        />
                        Joining...
                      </>
                    ) : (
                      <>
                        <Icon icon='heroicons:plus' className='mr-2 h-5 w-5' />
                        Join Community
                      </>
                    )}
                  </Button>
                ) : memberStatus === 'pending' ? (
                  <Button
                    disabled
                    size='lg'
                    variant='outline'
                    className='border-amber-200 bg-amber-50 text-amber-700 cursor-not-allowed'
                  >
                    <Icon icon='heroicons:clock' className='mr-2 h-5 w-5' />
                    Pending Approval
                  </Button>
                ) : memberStatus === 'approved' ? (
                  <Button
                    disabled
                    size='lg'
                    variant='outline'
                    className='border-emerald-200 bg-emerald-50 text-emerald-700 cursor-not-allowed'
                  >
                    <Icon
                      icon='heroicons:check-circle'
                      className='mr-2 h-5 w-5'
                    />
                    Joined
                  </Button>
                ) : (
                  <Button
                    disabled
                    size='lg'
                    variant='outline'
                    className='border-red-200 bg-red-50 text-red-700 cursor-not-allowed'
                  >
                    <Icon icon='heroicons:x-circle' className='mr-2 h-5 w-5' />
                    Rejected
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className='flex items-center gap-6 text-sm'>
              <div className='flex items-center gap-2'>
                <Icon
                  icon='heroicons:user-group'
                  className='h-5 w-5 text-muted-foreground'
                />
                <span>0 members</span>
              </div>
              <div className='flex items-center gap-2'>
                <Icon
                  icon='heroicons:calendar'
                  className='h-5 w-5 text-muted-foreground'
                />
                <span>
                  Created {new Date(community.created_at).toLocaleDateString()}
                </span>
              </div>
              <Badge variant='secondary' className='text-sm'>
                <Icon icon='heroicons:user' className='h-4 w-4 mr-1' />
                Created by {community.creator.name}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Content Area - Dynamic based on member status */}
        {memberStatus === 'none' ? (
          /* Join Prompt */
          <Card>
            <CardContent className='py-16'>
              <div className='text-center space-y-6'>
                <div className='h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto'>
                  <Icon
                    icon='heroicons:user-plus'
                    className='h-10 w-10 text-emerald-600'
                  />
                </div>
                <div>
                  <h2 className='text-2xl font-semibold mb-3'>
                    Join this community
                  </h2>
                  <p className='text-muted-foreground text-lg max-w-md mx-auto'>
                    You need to join this community to create posts and interact
                    with members.
                  </p>
                </div>
                <Button
                  onClick={handleJoinCommunity}
                  disabled={isJoining}
                  size='lg'
                  className='bg-emerald-500 hover:bg-emerald-600'
                >
                  {isJoining ? (
                    <>
                      <Icon
                        icon='heroicons:arrow-path'
                        className='mr-2 h-5 w-5 animate-spin'
                      />
                      Joining...
                    </>
                  ) : (
                    <>
                      <Icon icon='heroicons:plus' className='mr-2 h-5 w-5' />
                      Join Now
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : memberStatus === 'pending' ? null : memberStatus === 'approved' ? (
          <>
            {/* Success Message */}
            <Card className='border-emerald-200 bg-emerald-50/50'>
              <CardContent className='py-8'>
                <div className='flex items-center gap-4'>
                  <div className='h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center'>
                    <Icon
                      icon='heroicons:check-circle'
                      className='h-7 w-7 text-emerald-600'
                    />
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-emerald-900'>
                      You&apos;re now a member!
                    </h3>
                    <p className='text-emerald-700'>
                      You can now create posts and interact with the community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Create Post */}
            <Card>
              <CardHeader>
                <h2 className='text-xl font-semibold'>Create Post</h2>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Textarea
                  placeholder='Share something with the community...'
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={5}
                  className='resize-none text-base'
                />
                <div className='flex justify-end'>
                  <Button
                    onClick={handleCreatePost}
                    disabled={isPosting || !postContent.trim()}
                    size='lg'
                    className='bg-emerald-500 hover:bg-emerald-600'
                  >
                    {isPosting ? (
                      <>
                        <Icon
                          icon='heroicons:arrow-path'
                          className='mr-2 h-5 w-5 animate-spin'
                        />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Icon
                          icon='heroicons:paper-airplane'
                          className='mr-2 h-5 w-5'
                        />
                        Post
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <Card>
              <CardHeader>
                <h2 className='text-xl font-semibold'>Community Feed</h2>
              </CardHeader>
              <CardContent>
                <div className='text-center py-16'>
                  <Icon
                    icon='heroicons:chat-bubble-left-right'
                    className='h-16 w-16 mx-auto text-muted-foreground mb-4'
                  />
                  <p className='text-muted-foreground text-lg'>
                    No posts yet. Be the first to share something!
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Rejected */
          <Card className='border-red-200 bg-red-50/50'>
            <CardContent className='py-12'>
              <div className='text-center space-y-6'>
                <div className='h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mx-auto'>
                  <Icon
                    icon='heroicons:x-circle'
                    className='h-10 w-10 text-red-600'
                  />
                </div>
                <div>
                  <h2 className='text-2xl font-semibold mb-3 text-red-900'>
                    Join request rejected
                  </h2>
                  <p className='text-red-700 text-lg max-w-md mx-auto'>
                    Your request to join this community has been rejected by the
                    admin. Please contact the community admin for more
                    information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Wrapper>
  )
}

export { ReCommunityDetail }
