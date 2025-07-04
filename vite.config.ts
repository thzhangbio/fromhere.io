import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'react-hook-form',
      'react-quill',
      'html2canvas',
      'qrcode'
    ]
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})