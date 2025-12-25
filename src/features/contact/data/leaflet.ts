interface LeafletIcon {
  iconUrl: string
  iconSize: [number, number]
  iconAnchor: [number, number]
  popupAnchor: [number, number]
}

interface LeafletMapOptions {
  center: [number, number]
  zoom: number
  maxBounds?: [[number, number], [number, number]]
  maxBoundsViscosity?: number
}

interface LeafletTileLayerOptions {
  maxZoom: number
  minZoom: number
  attribution: string
}

interface LeafletMarkerOptions {
  icon?: LeafletIconInstance
}

interface LeafletPopupOptions {
  className?: string
}

type LeafletIconInstance = object

interface LeafletTileLayer {
  addTo(map: LeafletMap): void
}

interface LeafletMarker {
  bindPopup(
    content: string,
    options?: LeafletPopupOptions
  ): { addTo(map: LeafletMap): void }
}

interface LeafletMap {
  remove(): void
}

interface LeafletLibrary {
  map(element: HTMLElement, options: LeafletMapOptions): LeafletMap
  tileLayer(url: string, options: LeafletTileLayerOptions): LeafletTileLayer
  icon(options: LeafletIcon): LeafletIconInstance
  marker(
    coords: [number, number],
    options?: LeafletMarkerOptions
  ): LeafletMarker
}

declare global {
  interface Window {
    L: LeafletLibrary
  }
}

interface OfficeData {
  coords: [number, number]
  country: string
  city: string
  short: string
}

export { type LeafletMap, type OfficeData }
