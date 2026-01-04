export interface Community {
  id: number
  name: string
  slug?: string // Generated from name
  description: string
  location: string
  created_by: number
  created_at: string
  updated_at: string
  creator: {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    image: string | null
    phone: string | null
    bio: string | null
    created_at: string
    updated_at: string
  }
}

export interface CommunityMember {
  id: number
  community_id: number
  user_id: number
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface CommunityPost {
  id: number
  community_id: number
  user_id: number
  content: string
  created_at: string
  updated_at: string
}

export interface GetCommunitiesResponse {
  success: boolean
  data: Community[]
}

export interface GetCommunityDetailResponse {
  success: boolean
  data: Community | null
  message?: string
}

export interface GetMembershipStatusResponse {
  success: boolean
  data: {
    status: 'none' | 'pending' | 'approved' | 'rejected'
  }
}

export interface JoinCommunityResponse {
  success: boolean
  message: string
  data: CommunityMember
}

export interface CreatePostRequest {
  content: string
}

export interface CreatePostResponse {
  success: boolean
  message: string
  data: CommunityPost
}

export interface ApproveMemberResponse {
  success: boolean
  message: string
  data: CommunityMember
}

export interface RejectMemberResponse {
  success: boolean
  message: string
  data: CommunityMember
}
