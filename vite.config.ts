import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // <--- Ye sabse important line hai, isse CSS load hogi
})
