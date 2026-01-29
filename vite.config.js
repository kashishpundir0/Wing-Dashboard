import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // This tells Vite: "Any request starting with /api should be sent to Render"
      '/api': {
        target: 'https://wing-man-backend-2.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})