import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import initAppInsights from './appInsights'
import initGoogleAnalytics from './googleAnalytics'
import initAnalytics from './index'

vi.mock('./appInsights', () => ({ default: vi.fn() }))
vi.mock('./googleAnalytics', () => ({ default: vi.fn() }))

describe('initAnalytics', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_ENABLE_APP_INSIGHTS', '')
    vi.stubEnv('VITE_ENABLE_GOOGLE_ANALYTICS', '')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.clearAllMocks()
  })

  it('does not call initAppInsights when VITE_ENABLE_APP_INSIGHTS is not "true"', () => {
    initAnalytics()
    expect(initAppInsights).not.toHaveBeenCalled()
  })

  it('calls initAppInsights when VITE_ENABLE_APP_INSIGHTS is "true"', () => {
    vi.stubEnv('VITE_ENABLE_APP_INSIGHTS', 'true')
    initAnalytics()
    expect(initAppInsights).toHaveBeenCalledOnce()
  })

  it('does not call initGoogleAnalytics when VITE_ENABLE_GOOGLE_ANALYTICS is not "true"', () => {
    initAnalytics()
    expect(initGoogleAnalytics).not.toHaveBeenCalled()
  })

  it('calls initGoogleAnalytics when VITE_ENABLE_GOOGLE_ANALYTICS is "true"', () => {
    vi.stubEnv('VITE_ENABLE_GOOGLE_ANALYTICS', 'true')
    initAnalytics()
    expect(initGoogleAnalytics).toHaveBeenCalledOnce()
  })
})
