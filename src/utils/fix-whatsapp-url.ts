/**
 * Fix WhatsApp URL with broken emoji encoding
 * Decodes and re-encodes the URL properly
 */
export const fixWhatsAppUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    const phone = urlObj.pathname.replace('//', '')
    const encodedMessage = urlObj.searchParams.get('text')

    if (!encodedMessage) return url

    const decodedMessage = decodeURIComponent(encodedMessage)

    const properlyEncodedMessage = encodeURIComponent(decodedMessage)

    return `https://wa.me/${phone}?text=${properlyEncodedMessage}`
  } catch (error) {
    console.error('Failed to fix WhatsApp URL:', error)
    return url
  }
}
