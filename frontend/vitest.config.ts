import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    css: true,
    alias: {
      '@': path.resolve(__dirname, './src'),  // Point to src directory
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  // Same alias for both test and build
    }
  }
})