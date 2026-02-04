import initAppInsights from './appInsights'
import initGoogleAnalytics from './googleAnalytics'

const isEnabled = (value?: string) => value === 'true'

const initAnalytics = () => {
  const enableAppInsights = isEnabled(import.meta.env.VITE_ENABLE_APP_INSIGHTS)
  const enableGoogleAnalytics = isEnabled(import.meta.env.VITE_ENABLE_GOOGLE_ANALYTICS)

  if (enableAppInsights) {
    initAppInsights()
  }

  if (enableGoogleAnalytics) {
    initGoogleAnalytics()
  }
}

export default initAnalytics
