
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],

  // Required for GitHub Pages
  base: '/thecoffeechapter/',

  // Local development API proxy
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
