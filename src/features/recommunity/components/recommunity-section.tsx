'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Wrapper from '@/components/atoms/wrapper'
import { Input } from '@/components/atoms/input'
import { Icon } from '@/components/atoms/icon'
import { ReCommunityListSection } from './organisms/recommunity-list-section'
import { ReCommunitySkeletonSection } from './organisms/recommunity-skeleton-section'
import { getCommunities } from '../actions'
import type { Community } from '../types'
import { generateSlugWithId } from '../utils/generate-slug'

const ReCommunitySection: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await getCommunities()
        if (response.success) {
          setCommunities(response.data)
          if (response.data.length > 0) {
            setSelectedId(response.data[0].id)
          }
        }
      } catch (error) {
        toast.error('Failed to load communities')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCommunities()
  }, [])

  const communityItems = communities.map((community) => ({
    id: community.id,
    name: community.name,
    icon: 'heroicons:user-group-solid',
    count: '0', 
    description: community.description,
    slug: community.slug || generateSlugWithId(community.name, community.id),
  }))

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedCommunity =
    filteredCommunities.find((c) => c.id === selectedId) ||
    filteredCommunities[0]

  return (
    <Wrapper className='py-20 lg:py-32'>
      <div className='max-w-4xl mx-auto space-y-6'>
        {/* Search Bar */}
        <div className='relative'>
          <Icon
            icon='heroicons:magnifying-glass'
            className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5'
          />
          <Input
            type='text'
            placeholder='Search communities...'
            className='pl-12 h-12 text-base'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <ReCommunitySkeletonSection />
        ) : filteredCommunities.length === 0 ? (
          <div className='flex items-center justify-center h-96'>
            <div className='text-center'>
              <p className='text-xl font-semibold mb-2'>
                {searchTerm
                  ? 'No communities found'
                  : 'No communities available'}
              </p>
              <p className='text-muted-foreground'>
                {searchTerm
                  ? 'Try a different search term'
                  : 'Be the first to create one!'}
              </p>
            </div>
          </div>
        ) : (
          <ReCommunityListSection
            community={selectedCommunity || filteredCommunities[0]}
            onRefresh={() => {
              setLoading(true)
              getCommunities().then((response) => {
                if (response.success) {
                  setCommunities(response.data)
                }
                setLoading(false)
              })
            }}
          />
        )}
      </div>
    </Wrapper>
  )
}

export { ReCommunitySection }
