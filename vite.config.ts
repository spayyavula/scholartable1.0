import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: []
    }
  },
  resolve: {
    alias: {
      '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops': 
        './node_modules/@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops.js'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
});