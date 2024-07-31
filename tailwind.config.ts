import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#570a8d',
      }
    },
  },
  plugins: [],
}

export default config
