import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { isDoNotTrackEnabled, isTelemetryDisabled } from './common'

describe('isDoNotTrackEnabled', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', { ...navigator, doNotTrack: null })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns false when doNotTrack is null', () => {
    expect(isDoNotTrackEnabled()).toBe(false)
  })

  it('returns false when doNotTrack is "0"', () => {
    vi.stubGlobal('navigator', { ...navigator, doNotTrack: '0' })
    expect(isDoNotTrackEnabled()).toBe(false)
  })

  it('returns true when doNotTrack is "1"', () => {
    vi.stubGlobal('navigator', { ...navigator, doNotTrack: '1' })
    expect(isDoNotTrackEnabled()).toBe(true)
  })

  it('returns true when doNotTrack is "yes"', () => {
    vi.stubGlobal('navigator', { ...navigator, doNotTrack: 'yes' })
    expect(isDoNotTrackEnabled()).toBe(true)
  })
})

describe('isTelemetryDisabled', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('returns true when VITE_ANALYTICS_DISABLE is "true"', () => {
    vi.stubEnv('VITE_ANALYTICS_DISABLE', 'true')
    expect(isTelemetryDisabled()).toBe(true)
  })

  it('returns false when VITE_ANALYTICS_DISABLE is "false" and DNT is off', () => {
    vi.stubEnv('VITE_ANALYTICS_DISABLE', 'false')
    vi.stubGlobal('navigator', { ...navigator, doNotTrack: null })
    expect(isTelemetryDisabled()).toBe(false)
  })

  it('returns true when DNT is "1" regardless of env var', () => {
    vi.stubGlobal('navigator', { ...navigator, doNotTrack: '1' })
    expect(isTelemetryDisabled()).toBe(true)
  })
})
