'use client'

import { useEffect, useState } from 'react'
import AnimationContainer from '@/components/atoms/animation-container'
import SectionBadge from '@/components/atoms/section-badge'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import { Button } from '@/components/atoms/button'
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
  MapControls,
  MapRoute,
  useMap,
} from '@/components/ui/map'
import { RotateCcw, Mountain } from 'lucide-react'

// Lokasi-lokasi penting di Surabaya
const surabayaLocations = [
  {
    id: 1,
    name: 'ReShop Surabaya Pusat',
    address: 'Jl. Tunjungan No. 1, Genteng, Surabaya',
    phone: '+62 31 1234567',
    lng: 112.7388,
    lat: -7.2575,
  },
  {
    id: 2,
    name: 'ReShop Surabaya Timur',
    address: 'Jl. Raya Merr No. 25, Surabaya',
    phone: '+62 31 1234568',
    lng: 112.7521,
    lat: -7.3206,
  },
  {
    id: 3,
    name: 'ReShop Surabaya Barat',
    address: 'Jl. Darmo No. 100, Surabaya',
    phone: '+62 31 1234569',
    lng: 112.7277,
    lat: -7.2819,
  },
  {
    id: 4,
    name: 'ReShop Surabaya Utara',
    address: 'Jl. Kalibokor No. 50, Surabaya',
    phone: '+62 31 1234570',
    lng: 112.7521,
    lat: -7.2093,
  },
]

// Route connecting all locations
const surabayaRoute = surabayaLocations.map((loc) => [
  loc.lng,
  loc.lat,
]) as [number, number][]

// 3D View Controller Component
function MapController() {
  const { map, isLoaded } = useMap()
  const [pitch, setPitch] = useState(0)
  const [bearing, setBearing] = useState(0)

  useEffect(() => {
    if (!map || !isLoaded) return

    const handleMove = () => {
      setPitch(Math.round(map.getPitch()))
      setBearing(Math.round(map.getBearing()))
    }

    map.on('move', handleMove)
    return () => {
      map.off('move', handleMove)
    }
  }, [map, isLoaded])

  const handle3DView = () => {
    map?.easeTo({
      pitch: 60,
      bearing: -20,
      duration: 1000,
    })
  }

  const handleReset = () => {
    map?.easeTo({
      pitch: 0,
      bearing: 0,
      duration: 1000,
    })
  }

  if (!isLoaded) return null

  return (
    <div className='absolute top-3 left-3 z-10 flex flex-col gap-2'>
      <div className='flex gap-2'>
        <Button size='sm' variant='secondary' onClick={handle3DView}>
          <Mountain className='size-4 mr-1.5' />
          3D View
        </Button>
        <Button size='sm' variant='secondary' onClick={handleReset}>
          <RotateCcw className='size-4 mr-1.5' />
          Reset
        </Button>
      </div>
      <div className='rounded-md bg-background/90 backdrop-blur px-3 py-2 text-xs font-mono border'>
        <div>Pitch: {pitch}°</div>
        <div>Bearing: {bearing}°</div>
      </div>
    </div>
  )
}

const MapSection: React.FC = () => {
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
            Find us in Surabaya
          </TypingAnimation>
        </AnimationContainer>
        <AnimationContainer animation='fadeDown' delay={0.6}>
          <p className='text-sm md:text-base lg:text-lg text-muted-foreground text-center max-w-2xl'>
            Visit our stores across Surabaya. We&apos;re here to help you find
            the best reconditioned products for your needs.
          </p>
        </AnimationContainer>
      </div>
      <div className='h-[500px] rounded-lg overflow-hidden shadow-lg border [&_.maplibregl-ctrl-attrib]:opacity-30 [&_.maplibregl-ctrl-attrib]:text-[8px] hover:[&_.maplibregl-ctrl-attrib]:opacity-100 [&_.maplibregl-ctrl-attrib]:transition-opacity'>
        <Map center={[112.7521, -7.2575]} zoom={12}>
          {/* 3D View Controller */}
          <MapController />

          {/* Map Controls */}
          <MapControls
            position='bottom-right'
            showZoom
            showCompass
            showLocate
            showFullscreen
          />

          {/* Route connecting all locations */}
          <MapRoute
            coordinates={surabayaRoute}
            color='#10b981'
            width={3}
            opacity={0.6}
            dashArray={[5, 5]}
          />

          {/* Markers for each location */}
          {surabayaLocations.map((location, index) => (
            <MapMarker
              key={location.id}
              longitude={location.lng}
              latitude={location.lat}
            >
              <MarkerContent>
                <div className='relative'>
                  <div className='size-8 rounded-full bg-emerald-500 border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center'>
                    <span className='text-white text-xs font-bold'>
                      {index + 1}
                    </span>
                  </div>
                </div>
              </MarkerContent>
              <MarkerTooltip>{location.name}</MarkerTooltip>
              <MarkerPopup>
                <div className='space-y-2 min-w-[250px]'>
                  <h3 className='font-semibold text-base text-emerald-600'>
                    {location.name}
                  </h3>
                  <div className='space-y-1'>
                    <p className='text-sm text-muted-foreground'>
                      📍 {location.address}
                    </p>
                    <p className='text-sm'>
                      📞{' '}
                      <a
                        href={`tel:${location.phone}`}
                        className='text-emerald-600 hover:underline'
                      >
                        {location.phone}
                      </a>
                    </p>
                    <p className='text-xs text-muted-foreground pt-2'>
                      Coordinates: {location.lat.toFixed(4)},{' '}
                      {location.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  )
}

export { MapSection }
