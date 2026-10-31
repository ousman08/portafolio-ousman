import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ruta base relativa: permite publicar en cualquier hosting estático
// (Vercel, GitHub Pages, subcarpetas) sin reconfigurar nada.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'es2019',
    sourcemap: false,
    // CSS por ruta: el visitante solo descarga los estilos de la vista que abre.
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'react'
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})
