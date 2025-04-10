import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://character-generator-y9jf.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  base: '/character-generator/',
})
