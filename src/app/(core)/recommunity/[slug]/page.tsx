import { NotFound } from '@/components/atoms/http-client/404-not-found'
import { getCommunities } from '@/features/recommunity/actions'
import { ReCommunityDetail } from '@/features/recommunity/recommunity-detail'
import { extractIdFromSlug } from '@/features/recommunity/utils/generate-slug'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function CommunityDetailPage({ params }: PageProps) {
  const communityId = extractIdFromSlug(params.slug)

  if (!communityId) {
    return (
      <NotFound
        title='Invalid Community URL'
        message='The community link you followed is invalid. Please check the URL and try again.'
      />
    )
  }

  try {
    const response = await getCommunities()

    if (!response.success || !response.data) {
      return (
        <NotFound
          title='Community Not Found'
          message="This community doesn't exist or has been removed. Browse other communities instead."
        />
      )
    }

    const community = response.data.find((c) => c.id === communityId)

    if (!community) {
      return (
        <NotFound
          title='Community Not Found'
          message="This community doesn't exist or has been removed. Browse other communities instead."
        />
      )
    }

    return (
      <section id='community-detail' className='w-full'>
        <ReCommunityDetail community={community} />
      </section>
    )
  } catch (error) {
    console.error('Error loading community:', error)
    return (
      <NotFound
        title='Community Not Found'
        message="This community doesn't exist or has been removed. Browse other communities instead."
      />
    )
  }
}
