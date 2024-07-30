import react from '@vitejs/plugin-react-swc'
import * as dotenv from 'dotenv'
import { defineConfig } from 'vite'

// Load environment variables from .env file
dotenv.config()

// Check if the required environment variable is set
if (!process.env.VITE_GOOGLE_TAG_ID) {
  throw new Error('Google Tag ID is not defined. Please set VITE_GOOGLE_TAG_ID in your environment variables.')
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
