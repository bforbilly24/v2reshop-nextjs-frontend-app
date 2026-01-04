'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { env } from '@/config/environment'
import type {
  GetCommunitiesResponse,
  GetCommunityDetailResponse,
  GetMembershipStatusResponse,
  JoinCommunityResponse,
  CreatePostRequest,
  CreatePostResponse,
  ApproveMemberResponse,
  RejectMemberResponse,
} from './types'

/**
 * Get list of all communities
 */
export async function getCommunities(): Promise<GetCommunitiesResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) {
      throw new Error('Unauthorized')
    }

    const url = `${env.api.baseUrl}${env.api.version}${env.api.endpoints.communities.list}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch communities')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching communities:', error)
    throw error
  }
}

/**
 * Get community detail by ID
 */
export async function getCommunityDetail(
  communityId: number
): Promise<GetCommunityDetailResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) {
      throw new Error('Unauthorized')
    }

    const url = `${env.api.baseUrl}${env.api.version}/communities/${communityId}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          message: 'Community not found',
          data: null,
        } as GetCommunityDetailResponse
      }
      throw new Error('Failed to fetch community detail')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching community detail:', error)
    throw error
  }
}

/**
 * Get user's membership status in a community
 * Uses join endpoint which is idempotent and returns existing membership
 */
export async function getMembershipStatus(
  communityId: number
): Promise<GetMembershipStatusResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) {
      return {
        success: true,
        data: { status: 'none' },
      }
    }

    const url = `${env.api.baseUrl}${env.api.version}${env.api.endpoints.communities.join(communityId)}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return {
        success: true,
        data: { status: 'none' },
      }
    }

    const result = await response.json()
    
    if (result.success && result.data?.status) {
      return {
        success: true,
        data: { status: result.data.status },
      }
    }
    
    return {
      success: true,
      data: { status: 'none' },
    }
  } catch (error) {
    console.error('Error fetching membership status:', error)
    return {
      success: true,
      data: { status: 'none' },
    }
  }
}

/**
 * Request to join a community
 * User submits join request (status: pending)
 */
export async function joinCommunity(
  communityId: number
): Promise<JoinCommunityResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) {
      throw new Error('Unauthorized')
    }

    const url = `${env.api.baseUrl}${env.api.version}${env.api.endpoints.communities.join(communityId)}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to join community')
    }

    return await response.json()
  } catch (error) {
    console.error('Error joining community:', error)
    throw error
  }
}

/**
 * Approve member join request (Admin only)
 * Changes member status from pending to approved
 */
export async function approveMember(
  communityId: number,
  memberId: number
): Promise<ApproveMemberResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) {
      throw new Error('Unauthorized')
    }

    const url = `${env.api.baseUrl}${env.api.version}${env.api.endpoints.communities.approveMember(communityId, memberId)}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to approve member')
    }

    return await response.json()
  } catch (error) {
    console.error('Error approving member:', error)
    throw error
  }
}

/**
 * Reject member join request (Admin only)
 * Changes member status from pending to rejected
 */
export async function rejectMember(
  communityId: number,
  memberId: number
): Promise<RejectMemberResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) {
      throw new Error('Unauthorized')
    }

    const url = `${env.api.baseUrl}${env.api.version}${env.api.endpoints.communities.rejectMember(communityId, memberId)}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to reject member')
    }

    return await response.json()
  } catch (error) {
    console.error('Error rejecting member:', error)
    throw error
  }
}

/**
 * Create post in community
 * Only approved members can create posts
 */
export async function createCommunityPost(
  communityId: number,
  payload: CreatePostRequest
): Promise<CreatePostResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) {
      throw new Error('Unauthorized')
    }

    const url = `${env.api.baseUrl}${env.api.version}${env.api.endpoints.communities.posts(communityId)}`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create post')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}
