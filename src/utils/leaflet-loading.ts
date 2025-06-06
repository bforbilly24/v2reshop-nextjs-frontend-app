import { MAP_CONFIG } from '@/constant'

const loadLeaflet = async (): Promise<void> => {
  if (!window.L) {
    const script = document.createElement('script')
    script.src = MAP_CONFIG.LEAFLET_CDN.url
    script.integrity = MAP_CONFIG.LEAFLET_CDN.integrity
    script.crossOrigin = ''

    await new Promise<void>((resolve, reject) => {
      script.onload = () => resolve()
      script.onerror = reject
      document.head.appendChild(script)
    })
  }
}

export { loadLeaflet }
