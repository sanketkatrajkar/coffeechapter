
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  // GitHub Pages: /coffeechapter/
  // Vercel: /
  base: mode === 'github' ? '/coffeechapter/' : '/',

  // Local development API proxy
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
}))
