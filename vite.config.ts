import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Explicitly exclude problematic modules
      external: [
        '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops'
      ],
      output: {
        // Improve chunking strategy
        manualChunks(id) {
          // Group React and related packages
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          
          // Group UI-related packages
          if (id.includes('node_modules/framer-motion') || 
              id.includes('node_modules/lucide-react')) {
            return 'ui-vendor';
          }
          
          // Separate chunk for TensorFlow (if used)
          if (id.includes('node_modules/@tensorflow')) {
            return 'tensorflow-vendor';
          }
        },
        // Avoid using problematic imports in generated code
        intro: 'window.__tfjs_chained_ops_resolved = true;'
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true
  },
  resolve: {
    // More robust alias approach
    alias: {
      '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops': 
        './src/polyfills.ts'
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'framer-motion', 
      'lucide-react'
    ],
    exclude: [
      '@tensorflow/tfjs', 
      '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
        // Add additional definitions to help with browser compatibility
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }
  },
  server: {
    open: true,
    cors: true
  }
});