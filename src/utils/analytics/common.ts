const isDoNotTrackEnabled = () => {
  if (typeof navigator === 'undefined') {
    return false
  }

  const windowWithDnt = typeof window !== 'undefined'
    ? (window as Window & { doNotTrack?: string })
    : null
  const dnt = navigator.doNotTrack || windowWithDnt?.doNotTrack
  return dnt === '1' || dnt === 'yes'
}

const isTelemetryDisabled = () => {
  if (import.meta.env.VITE_ANALYTICS_DISABLE === 'true') {
    return true
  }

  return isDoNotTrackEnabled()
}

export { isDoNotTrackEnabled, isTelemetryDisabled }
