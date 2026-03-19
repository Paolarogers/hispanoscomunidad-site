import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('react-router-dom')) {
            return 'vendor-react';
          }
          if (id.includes('src/pages/Bonanza')) return 'page-bonanza';
          if (id.includes('src/pages/Zivo'))    return 'page-zivo';
          if (id.includes('src/pages/Events'))  return 'page-events';
          if (id.includes('src/pages/Gallery')) return 'page-gallery';
          if (id.includes('src/pages/Blog'))    return 'page-blog';
          if (id.includes('src/pages/Unidos'))  return 'page-unidos';
        },
      },
    },
  },
})
