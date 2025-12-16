import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Landing_Demos/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
    server: {
    port: 3000,
    strictPort: true,
  },
  resolve:{
    alias:{
      "@": path.resolve(__dirname,"src")
    },
  },
})