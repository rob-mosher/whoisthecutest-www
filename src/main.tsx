import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import loadGoogleAnalytics from './utils/analytics.ts'
import './index.css'

loadGoogleAnalytics()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
