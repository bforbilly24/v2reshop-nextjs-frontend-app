import { OfficeData } from './leaflet'

const OFFICES: OfficeData[] = [
  {
    coords: [-7.2575, 112.7521],
    country: 'Indonesia',
    city: 'Surabaya',
    short: 'id',
    // current: {
    //   value: '8,500',
    //   percent: '15.2',
    //   isGrown: true,
    // },
    // previous: {
    //   value: '650',
    //   percent: '12.1',
    //   isGrown: true,
    // },
  },
  //   {
  //     coords: [-6.2088, 106.8456],
  //     country: 'Indonesia',
  //     city: 'Jakarta',
  //     short: 'id',
  //     current: {
  //       value: '12,400',
  //       percent: '8.7',
  //       isGrown: false,
  //     },
  //     previous: {
  //       value: '890',
  //       percent: '5.3',
  //       isGrown: true,
  //     },
  //   },
]

const MAP_CONFIG = {
  INDONESIA_CENTER: [-7.2575, 112.7521] as [number, number],
  DEFAULT_ZOOM: 12,
  //   INDONESIA_CENTER: [-6.9175, 107.6191] as [number, number],
  //   DEFAULT_ZOOM: 7,
  MAX_BOUNDS: [
    [-11.0, 95.0],
    [-6.0, 141.0],
  ] as [[number, number], [number, number]],
  MAX_BOUNDS_VISCOSITY: 1.0,
  TILE_LAYER_URL:
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  TILE_LAYER_OPTIONS: {
    maxZoom: 19,
    minZoom: 2,
    attribution: '© <a href="https://carto.com/attributions">CARTO</a>',
  },
  LEAFLET_CDN: {
    url: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=',
  },
}

const createLucideMapPinIcon = (color: string = '#10b981') => {
  const mapPinSvg = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${encodeURIComponent(color)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`

  return mapPinSvg
}

const ICON_CONFIG = {
  iconUrl: createLucideMapPinIcon('#10b981'),
  iconSize: [32, 32] as [number, number],
  iconAnchor: [16, 32] as [number, number],
  popupAnchor: [0, -32] as [number, number],
}

const ICON_VARIANTS = {
  emerald: {
    ...ICON_CONFIG,
    iconUrl: createLucideMapPinIcon('#10b981'),
  },
  blue: {
    ...ICON_CONFIG,
    iconUrl: createLucideMapPinIcon('#3b82f6'),
  },
  red: {
    ...ICON_CONFIG,
    iconUrl: createLucideMapPinIcon('#ef4444'),
  },
  purple: {
    ...ICON_CONFIG,
    iconUrl: createLucideMapPinIcon('#a855f7'),
  },
  orange: {
    ...ICON_CONFIG,
    iconUrl: createLucideMapPinIcon('#f97316'),
  },
}

export {
  OFFICES,
  MAP_CONFIG,
  ICON_CONFIG,
  ICON_VARIANTS,
  createLucideMapPinIcon,
}
