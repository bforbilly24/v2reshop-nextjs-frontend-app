import { InternalError } from '@/components/atoms/http-client'

export default function InternalErrorPage() {
  return (
    <InternalError message="The server encountered an internal error and was unable to complete your request." />
  )
}
