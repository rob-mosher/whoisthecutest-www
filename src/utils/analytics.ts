// src/utils/analytics.ts
const loadGoogleAnalytics = () => {
  if (import.meta.env.PROD) {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4M81HGM6BL'
    document.head.appendChild(script)

    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      function gtag() { dataLayer.push(arguments) }
      gtag('js', new Date())
      gtag('config', 'G-4M81HGM6BL')
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('Google Analytics script would be loaded here.')
    window.dataLayer = window.dataLayer || []
    function gtag() { dataLayer.push(arguments) }
    gtag('js', new Date())
    gtag('config', 'G-4M81HGM6BL')
    // eslint-disable-next-line no-console
    console.log('Simulating gtag call:', window.dataLayer)
  }
}

export default loadGoogleAnalytics
