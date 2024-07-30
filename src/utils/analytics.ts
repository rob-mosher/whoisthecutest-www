const loadGoogleAnalytics = () => {
  if (import.meta.env.PROD) {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4M81HGM6BL'
    document.head.appendChild(script)

    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function gtag(...args: any[]) { window.dataLayer.push(args) }
      gtag('js', new Date())
      gtag('config', 'G-4M81HGM6BL')
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('Google Analytics script would be loaded here.')
    window.dataLayer = window.dataLayer || []
    // eslint-disable-next-line no-inner-declarations, @typescript-eslint/no-explicit-any
    function gtag(...args: any[]) { window.dataLayer.push(args) }
    gtag('js', new Date())
    gtag('config', 'G-4M81HGM6BL')
    // eslint-disable-next-line no-console
    console.log('Simulating gtag call:', window.dataLayer)
  }
}

export default loadGoogleAnalytics
