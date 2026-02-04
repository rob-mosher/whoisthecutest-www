import { isTelemetryDisabled } from './common'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const initGoogleAnalytics = () => {
  // googleTagId is validated at build time, so we can trust it here
  const googleTagId = import.meta.env.VITE_GOOGLE_TAG_ID || ''

  if (!import.meta.env.PROD) {
    // eslint-disable-next-line no-console
    console.log('Non-production build detected. Google Analytics script would be loaded here.')
    return null
  }

  if (!googleTagId) {
    // eslint-disable-next-line no-console
    console.warn('Missing VITE_GOOGLE_TAG_ID. Google Analytics disabled.')
    return null
  }

  if (isTelemetryDisabled()) {
    return null
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagId}`
  document.head.appendChild(script)

  script.onload = () => {
    window.dataLayer = window.dataLayer || []
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', googleTagId)
  }

  return null
}

export default initGoogleAnalytics
