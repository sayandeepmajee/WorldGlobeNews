import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Split the heavier, rarely-changing vendor code (map projection
        // math, animation) from app code so the browser can cache it
        // independently across deploys.
        manualChunks(id) {
          if (id.includes('react-simple-maps') || id.includes('d3-')) return 'vendor-map';
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('@tanstack') || id.includes('axios')) return 'vendor-query';
        },
      },
    },
  },
})

