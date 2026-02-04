const isDoNotTrackEnabled = () => {
  if (typeof navigator === 'undefined') {
    return false
  }

  const dnt = navigator.doNotTrack || (typeof window !== 'undefined' ? window.doNotTrack : undefined)
  return dnt === '1' || dnt === 'yes'
}

const isTelemetryDisabled = () => {
  if (import.meta.env.VITE_ANALYTICS_DISABLE === 'true') {
    return true
  }

  return isDoNotTrackEnabled()
}

export { isDoNotTrackEnabled, isTelemetryDisabled }
