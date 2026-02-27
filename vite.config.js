import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // When you call /api/login locally:
      '/api': {
        target: 'https://api.wingmann.online', // It sends it to the API domain
        changeOrigin: true,
        secure: false,
        // No rewrite needed here because the backend 
        // already expects the "/api" prefix.
      },
    },
  },
})