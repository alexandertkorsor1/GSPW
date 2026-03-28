import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/GSPW/', // Required for GitHub Pages deployment
  plugins: [react()],
})
