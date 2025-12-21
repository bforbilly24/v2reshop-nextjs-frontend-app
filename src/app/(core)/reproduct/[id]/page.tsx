import { notFound } from 'next/navigation'
import { ReProductDetailView } from '@/features/reproduct/reproduct-detail'
import { getProductBySlug } from '@/features/reproduct/reproduct-detail/actions'

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params

  try {
    const res = await getProductBySlug(id)
    if (!res.status || !res.data) {
      return {
        title: 'Product Not Found | Re-shop',
      }
    }

    return {
      title: `${res.data.name} | Re-shop`,
      description: res.data.description,
    }
  } catch {
    return {
      title: 'Product Not Found | Re-shop',
    }
  }
}

export default async function ReProductDetailPage({ params }: Props) {
  const { id } = await params

  try {
    const res = await getProductBySlug(id)

    if (!res.status || !res.data) {
      notFound()
    }

    return <ReProductDetailView product={res.data} />
  } catch {
    notFound()
  }
}
