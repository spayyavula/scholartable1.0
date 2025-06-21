import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      'lucide-react',
      '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops'
    ]
  },
});
