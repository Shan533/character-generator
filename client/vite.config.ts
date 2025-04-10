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
  define: {
    // Make sure environment variables are properly stringified
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://character-generator-y9jf.onrender.com/api'),
  },
})
