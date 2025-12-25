import { siteConfig } from '@/config/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReProductDetailView } from '@/features/reproduct/reproduct-detail'
import { getProductBySlug } from '@/features/reproduct/reproduct-detail/actions'

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  try {
    const res = await getProductBySlug(id)
    if (!res.status || !res.data) {
      return {
        title: 'Product Not Found',
        description: 'The product you are looking for could not be found.',
      }
    }

    const product = res.data

    return {
      title: product.name,
      description: product.description,
      keywords: [
        product.name,
        product.category.name,
        'sustainable',
        'eco-friendly',
        'recycled',
        ...siteConfig.keywords,
      ],
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.images?.length
          ? product.images.map((img) => ({
              url: img,
              width: 600,
              height: 600,
              alt: product.name,
            }))
          : [],
        type: 'website',
        url: `${siteConfig.url}/reproduct/${product.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description,
        images: product.images?.[0] ? [product.images[0]] : [],
      },
      alternates: {
        canonical: `${siteConfig.url}/reproduct/${product.slug}`,
      },
    }
  } catch {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for could not be found.',
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
