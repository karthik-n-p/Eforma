import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // proxy: {
  //   "/api": {
  //     target: "https://renovation-lji1.onrender.com",
  //     changeOrigin: true,
  //     secure: false,
  //   },
  // },
  plugins: [react(),

    tailwindcss() 
  ],
  
})
