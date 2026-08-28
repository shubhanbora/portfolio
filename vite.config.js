import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // serve from root so public/ images resolve correctly
  publicDir: 'public',
})
