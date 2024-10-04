import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Replace '/api' with the endpoint path you want to proxy
      '/api': {
        target: 'https://cloud.appwrite.io/v1', // Your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' from the path
      },
    },
  },
})
