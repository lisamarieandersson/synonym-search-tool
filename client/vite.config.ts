import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Ensures tests are run in a browser-like environment
    setupFiles: './tests/setup/setup.ts',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // Use modern-compiler for better performance
      },
    },
  },
});
