import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss"
import {config} from "dotenv"
// import react from '@vitejs/plugin-react-swc'

config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   define: {
    'process.env': process.env.production
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  },
  build: {
    assetsInlineLimit: 0
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})