import { NotFound } from '@/components/atoms/http-client'

export default function ProductNotFound() {
  return (
    <NotFound
      title='Product Not Found'
      message="The product you're looking for doesn't exist or has been removed."
    />
  )
}
