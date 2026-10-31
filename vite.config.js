import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Ruta base relativa: permite publicar en cualquier hosting estático
// (Vercel, GitHub Pages, subcarpetas) sin reconfigurar nada.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    target: 'es2019',
    sourcemap: false,
    // CSS dividido por ruta: el visitante solo descarga los estilos que usa.
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
