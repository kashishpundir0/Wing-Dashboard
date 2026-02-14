// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // When Axios calls '/api/...'
      '/api': {
        // This target + the call results in https://wingmann.online/api/api/...
        target: 'https://wingmann.online/api',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})