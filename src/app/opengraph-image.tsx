import { siteConfig } from '@/config/seo'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = siteConfig.name
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function OgImage() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        backgroundImage:
          'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
        backgroundSize: '100px 100px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #16a34a 0%, #059669 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'flex',
          }}
        >
          ReShop
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#64748b',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          {siteConfig.description}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#16a34a',
              color: 'white',
              borderRadius: '8px',
              fontSize: 24,
            }}
          >
            ♻️ Sustainable
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#059669',
              color: 'white',
              borderRadius: '8px',
              fontSize: 24,
            }}
          >
            🌱 Eco-Friendly
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  )
}
