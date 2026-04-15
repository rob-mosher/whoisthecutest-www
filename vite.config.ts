import react from '@vitejs/plugin-react-swc'
import * as dotenv from 'dotenv'
import tsNode from 'ts-node'
import { defineConfig } from 'vitest/config'

dotenv.config()
tsNode.register()

const enableAppInsights = process.env.VITE_ENABLE_APP_INSIGHTS === 'true'
const enableGoogleAnalytics = process.env.VITE_ENABLE_GOOGLE_ANALYTICS === 'true'
const telemetryDisabled = process.env.VITE_ANALYTICS_DISABLE === 'true'

if (!telemetryDisabled) {
  if (enableAppInsights && !process.env.VITE_APP_INSIGHTS_CONNECTION_STRING) {
    throw new Error(
      'App Insights connection string is not defined. Please set VITE_APP_INSIGHTS_CONNECTION_STRING in your environment variables.'
    )
  }

  if (enableGoogleAnalytics && !process.env.VITE_GOOGLE_TAG_ID) {
    throw new Error('Google Tag ID is not defined. Please set VITE_GOOGLE_TAG_ID in your environment variables.')
  }
}

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
