interface SideCommunityRawItem {
  id: number
  name: string
  icon: string
  count?: number | string
  description?: string
}

interface CommunityItem {
  id: number
  name: string
  icon: string
  count?: string
  description?: string
}

interface SidebarCommunityProps {
  searchTerm?: string
  onSearchChange?: (value: string) => void
  selectedId?: number
  onSelectedIdChange?: (id: number) => void
  onCreateCommunity?: () => void
  communityItems?: CommunityItem[]
}

interface CommunityReview {
  name: string
  updatedAt: Date
  starRating: number
  comment: string
  images?: string[]
}

interface DetailedCommunityItem extends CommunityItem {
  category: string
  createdAt: Date
  updatedAt: Date
  members: number
  isPublic: boolean
  reviews: CommunityReview[]
}

interface MemberRange {
  label: string
  value: {
    min: number
    max: number
  }
  count: string
}

interface CommunityCategory {
  label: string
  value: string
  count: string
}

const mapSideCommunityToItems = (
  sideCommunity: SideCommunityRawItem[]
): CommunityItem[] => {
  return sideCommunity.map((item) => ({
    id: item.id,
    name: item.name,
    icon: item.icon,
    count: item.count?.toString() || '0',
    description: item.description,
  }))
}

export {
  type CommunityItem,
  type SidebarCommunityProps,
  type DetailedCommunityItem,
  type CommunityReview,
  type MemberRange,
  type CommunityCategory,
  mapSideCommunityToItems,
}
