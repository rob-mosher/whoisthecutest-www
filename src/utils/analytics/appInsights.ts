import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { isTelemetryDisabled } from './common'

const initAppInsights = () => {
  const connectionString = import.meta.env.VITE_APP_INSIGHTS_CONNECTION_STRING || ''

  if (!import.meta.env.PROD) {
    // eslint-disable-next-line no-console
    console.log('Non-production build detected. App Insights would be initialized here.')
    return null
  }

  if (!connectionString) {
    // eslint-disable-next-line no-console
    console.warn('Missing VITE_APP_INSIGHTS_CONNECTION_STRING. App Insights disabled.')
    return null
  }

  if (isTelemetryDisabled()) {
    return null
  }

  const appInsights = new ApplicationInsights({
    config: {
      connectionString,
      disableCookiesUsage: true,
      enableAutoRouteTracking: false,
    },
  })

  appInsights.loadAppInsights()
  appInsights.trackPageView()

  return appInsights
}

export default initAppInsights
