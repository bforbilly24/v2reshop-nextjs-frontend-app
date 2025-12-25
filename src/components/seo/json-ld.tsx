import { siteConfig } from '@/config/seo'

export interface JsonLdProps {
  type: 'website' | 'product' | 'organization' | 'breadcrumb' | 'article'
  data?: Record<string, unknown>
}

export function generateJsonLd({ type, data }: JsonLdProps) {
  const baseContext = 'https://schema.org'

  switch (type) {
    case 'website':
      return {
        '@context': baseContext,
        '@type': 'WebSite',
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteConfig.url}/reproduct?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }

    case 'organization':
      return {
        '@context': baseContext,
        '@type': 'Organization',
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/brand/app-brand.svg`,
        sameAs: [siteConfig.links.twitter, siteConfig.links.github],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          email: 'support@reshop.com',
        },
      }

    case 'product':
      if (!data) return null
      return {
        '@context': baseContext,
        '@type': 'Product',
        name: data.name,
        description: data.description,
        image: data.images || [],
        brand: {
          '@type': 'Brand',
          name: siteConfig.name,
        },
        offers: {
          '@type': 'Offer',
          price: data.final_price || data.price,
          priceCurrency: 'IDR',
          availability: data.in_stock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          url: `${siteConfig.url}/reproduct/${data.slug}`,
        },
        aggregateRating: data.rating_count
          ? {
              '@type': 'AggregateRating',
              ratingValue: data.rating_count,
              reviewCount: data.sold_count || 0,
            }
          : undefined,
      }

    case 'breadcrumb':
      if (!data?.items) return null
      return {
        '@context': baseContext,
        '@type': 'BreadcrumbList',
        itemListElement: (
          data.items as Array<{ name: string; url?: string }>
        ).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url ? `${siteConfig.url}${item.url}` : undefined,
        })),
      }

    case 'article':
      if (!data) return null
      return {
        '@context': baseContext,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.publishedAt,
        dateModified: data.updatedAt,
        author: {
          '@type': 'Organization',
          name: siteConfig.name,
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/images/brand/app-brand.svg`,
          },
        },
      }

    default:
      return null
  }
}

export function JsonLd({ type, data }: JsonLdProps) {
  const jsonLd = generateJsonLd({ type, data })

  if (!jsonLd) return null

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
