import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Improve production build configuration
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          // Split large dependencies into separate chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react']
        }
      }
    },
    // Improve chunk loading
    chunkSizeWarningLimit: 1000,
    sourcemap: true
  },
  resolve: {
    // Use a more robust approach for TensorFlow.js imports
    alias: [
      {
        find: '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops',
        replacement: './node_modules/@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops.js'
      }
    ]
  },
  optimizeDeps: {
    // Improve dependency optimization
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    exclude: ['@tensorflow/tfjs'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  // Add server configuration for better development experience
  server: {
    open: true,
    cors: true
  }
});