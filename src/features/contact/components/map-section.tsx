'use client'

import { useEffect, useRef, useCallback } from 'react'
import { ICON_CONFIG, LeafletMap, MAP_CONFIG, OFFICES } from '@/constant'
import 'leaflet/dist/leaflet.css'
import { loadLeaflet } from '@/utils/leaflet-loading'
import { TypingAnimation } from '@/components/ui/magicui/typing-animation'
import AnimationContainer from '@/components/global/animation-container'
import SectionBadge from '@/components/ui/section-badge'
import { createPopupContent } from '../content/popup-content'
import { addCustomStyles } from '../style/leaflet'

const MapSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)

  const initializeMap = useCallback(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
    }

    addCustomStyles()

    const map = window.L.map(mapRef.current!, {
      center: MAP_CONFIG.INDONESIA_CENTER,
      zoom: MAP_CONFIG.DEFAULT_ZOOM,
      maxBounds: MAP_CONFIG.MAX_BOUNDS,
      maxBoundsViscosity: MAP_CONFIG.MAX_BOUNDS_VISCOSITY,
    })

    window.L.tileLayer(
      MAP_CONFIG.TILE_LAYER_URL,
      MAP_CONFIG.TILE_LAYER_OPTIONS
    ).addTo(map)

    const defaultIcon = window.L.icon(ICON_CONFIG)

    OFFICES.forEach((office) => {
      const iconToUse = defaultIcon

      window.L.marker(office.coords, { icon: iconToUse })
        .bindPopup(createPopupContent(office), {
          className: 'hs-leaflet-unstyled-popover',
        })
        .addTo(map)
    })

    mapInstanceRef.current = map
  }, [])

  const handleMapInitialization = useCallback(async () => {
    if (typeof window === 'undefined' || !mapRef.current) return

    try {
      await loadLeaflet()
      initializeMap()
    } catch (error) {
      console.error('Failed to load Leaflet:', error)
    }
  }, [initializeMap])

  useEffect(() => {
    handleMapInitialization()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [handleMapInitialization])

  return (
    <div className='py-20 lg:py-32'>
      <div className='flex flex-col items-center justify-center mb-8 gap-y-4'>
        <AnimationContainer animation='fadeDown' delay={0.2} className='w-fit'>
          <SectionBadge title='ReShop Office' />
        </AnimationContainer>
        <AnimationContainer animation='fadeDown' delay={0.4}>
          <TypingAnimation
            duration={50}
            className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
          >
            Find us in Indonesia
          </TypingAnimation>
        </AnimationContainer>
      </div>
      <div
        ref={mapRef}
        id='hs-custom-pin-leaflet'
        className='h-96 hs-leaflet z-10 rounded-lg overflow-hidden shadow-lg'
      />
    </div>
  )
}

export { MapSection }
