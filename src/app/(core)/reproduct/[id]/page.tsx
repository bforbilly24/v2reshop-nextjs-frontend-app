import { notFound } from 'next/navigation'
import { ReProductDetail } from '@/features/reproduct-detail'
import { getProductById } from '@/constant'

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return {
      title: 'Product Not Found | Re-shop',
    }
  }

  return {
    title: `${product.name} | Re-shop`,
    description: product.desc,
  }
}

export default async function ReProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return <ReProductDetail product={product} />
}