import react from '@vitejs/plugin-react-swc'
import * as dotenv from 'dotenv'
import tsNode from 'ts-node'
import { defineConfig } from 'vite'

dotenv.config()
tsNode.register()

if (!process.env.VITE_GOOGLE_TAG_ID) {
  throw new Error('Google Tag ID is not defined. Please set VITE_GOOGLE_TAG_ID in your environment variables.')
}

export default defineConfig({
  plugins: [react()],
})
