// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    // Improve production build configuration
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          // Split large dependencies into separate chunks
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": ["framer-motion", "lucide-react"]
        }
      }
    },
    // Improve chunk loading
    chunkSizeWarningLimit: 1e3,
    sourcemap: true
  },
  resolve: {
    // Use a more robust approach for TensorFlow.js imports
    alias: [
      {
        find: "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops",
        replacement: "./node_modules/@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops.js"
      }
    ]
  },
  optimizeDeps: {
    // Improve dependency optimization
    include: ["react", "react-dom", "framer-motion", "lucide-react"],
    exclude: ["@tensorflow/tfjs"],
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  },
  // Add server configuration for better development experience
  server: {
    open: true,
    cors: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBJbXByb3ZlIHByb2R1Y3Rpb24gYnVpbGQgY29uZmlndXJhdGlvblxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAvLyBTcGxpdCBsYXJnZSBkZXBlbmRlbmNpZXMgaW50byBzZXBhcmF0ZSBjaHVua3NcbiAgICAgICAgICAncmVhY3QtdmVuZG9yJzogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICAndWktdmVuZG9yJzogWydmcmFtZXItbW90aW9uJywgJ2x1Y2lkZS1yZWFjdCddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIEltcHJvdmUgY2h1bmsgbG9hZGluZ1xuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICBzb3VyY2VtYXA6IHRydWVcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIC8vIFVzZSBhIG1vcmUgcm9idXN0IGFwcHJvYWNoIGZvciBUZW5zb3JGbG93LmpzIGltcG9ydHNcbiAgICBhbGlhczogW1xuICAgICAge1xuICAgICAgICBmaW5kOiAnQHRlbnNvcmZsb3cvdGZqcy1jb3JlL2Rpc3QvcHVibGljL2NoYWluZWRfb3BzL3JlZ2lzdGVyX2FsbF9jaGFpbmVkX29wcycsXG4gICAgICAgIHJlcGxhY2VtZW50OiAnLi9ub2RlX21vZHVsZXMvQHRlbnNvcmZsb3cvdGZqcy1jb3JlL2Rpc3QvcHVibGljL2NoYWluZWRfb3BzL3JlZ2lzdGVyX2FsbF9jaGFpbmVkX29wcy5qcydcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIC8vIEltcHJvdmUgZGVwZW5kZW5jeSBvcHRpbWl6YXRpb25cbiAgICBpbmNsdWRlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdmcmFtZXItbW90aW9uJywgJ2x1Y2lkZS1yZWFjdCddLFxuICAgIGV4Y2x1ZGU6IFsnQHRlbnNvcmZsb3cvdGZqcyddLFxuICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICBkZWZpbmU6IHtcbiAgICAgICAgZ2xvYmFsOiAnZ2xvYmFsVGhpcydcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vIEFkZCBzZXJ2ZXIgY29uZmlndXJhdGlvbiBmb3IgYmV0dGVyIGRldmVsb3BtZW50IGV4cGVyaWVuY2VcbiAgc2VydmVyOiB7XG4gICAgb3BlbjogdHJ1ZSxcbiAgICBjb3JzOiB0cnVlXG4gIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUE7QUFBQSxJQUVMLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQztBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixnQkFBZ0IsQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUNyQyxhQUFhLENBQUMsaUJBQWlCLGNBQWM7QUFBQSxRQUMvQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLHVCQUF1QjtBQUFBLElBQ3ZCLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFTO0FBQUE7QUFBQSxJQUVQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUE7QUFBQSxJQUVaLFNBQVMsQ0FBQyxTQUFTLGFBQWEsaUJBQWlCLGNBQWM7QUFBQSxJQUMvRCxTQUFTLENBQUMsa0JBQWtCO0FBQUEsSUFDNUIsZ0JBQWdCO0FBQUEsTUFDZCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
