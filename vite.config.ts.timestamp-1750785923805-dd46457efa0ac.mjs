// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Explicitly exclude problematic modules
      external: [
        "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops"
      ],
      output: {
        // Improve chunking strategy
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/lucide-react")) {
            return "ui-vendor";
          }
          if (id.includes("node_modules/@tensorflow")) {
            return "tensorflow-vendor";
          }
        },
        // Avoid using problematic imports in generated code
        intro: "window.__tfjs_chained_ops_resolved = true;"
      }
    },
    chunkSizeWarningLimit: 1e3,
    sourcemap: true
  },
  resolve: {
    // More robust alias approach
    alias: {
      "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops": "./src/polyfills.ts"
    }
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "lucide-react"
    ],
    exclude: [
      "@tensorflow/tfjs",
      "@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops"
    ],
    esbuildOptions: {
      define: {
        global: "globalThis",
        // Add additional definitions to help with browser compatibility
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
      }
    }
  },
  server: {
    open: true,
    cors: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAvLyBFeHBsaWNpdGx5IGV4Y2x1ZGUgcHJvYmxlbWF0aWMgbW9kdWxlc1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgJ0B0ZW5zb3JmbG93L3RmanMtY29yZS9kaXN0L3B1YmxpYy9jaGFpbmVkX29wcy9yZWdpc3Rlcl9hbGxfY2hhaW5lZF9vcHMnXG4gICAgICBdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIEltcHJvdmUgY2h1bmtpbmcgc3RyYXRlZ3lcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgLy8gR3JvdXAgUmVhY3QgYW5kIHJlbGF0ZWQgcGFja2FnZXNcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWFjdCcpIHx8IFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3JlYWN0LWRvbScpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3JlYWN0LXZlbmRvcic7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC8vIEdyb3VwIFVJLXJlbGF0ZWQgcGFja2FnZXNcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9mcmFtZXItbW90aW9uJykgfHwgXG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0JykpIHtcbiAgICAgICAgICAgIHJldHVybiAndWktdmVuZG9yJztcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gU2VwYXJhdGUgY2h1bmsgZm9yIFRlbnNvckZsb3cgKGlmIHVzZWQpXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvQHRlbnNvcmZsb3cnKSkge1xuICAgICAgICAgICAgcmV0dXJuICd0ZW5zb3JmbG93LXZlbmRvcic7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBBdm9pZCB1c2luZyBwcm9ibGVtYXRpYyBpbXBvcnRzIGluIGdlbmVyYXRlZCBjb2RlXG4gICAgICAgIGludHJvOiAnd2luZG93Ll9fdGZqc19jaGFpbmVkX29wc19yZXNvbHZlZCA9IHRydWU7J1xuICAgICAgfVxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxuICAgIHNvdXJjZW1hcDogdHJ1ZVxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgLy8gTW9yZSByb2J1c3QgYWxpYXMgYXBwcm9hY2hcbiAgICBhbGlhczoge1xuICAgICAgJ0B0ZW5zb3JmbG93L3RmanMtY29yZS9kaXN0L3B1YmxpYy9jaGFpbmVkX29wcy9yZWdpc3Rlcl9hbGxfY2hhaW5lZF9vcHMnOiBcbiAgICAgICAgJy4vc3JjL3BvbHlmaWxscy50cydcbiAgICB9XG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICdyZWFjdCcsIFxuICAgICAgJ3JlYWN0LWRvbScsIFxuICAgICAgJ2ZyYW1lci1tb3Rpb24nLCBcbiAgICAgICdsdWNpZGUtcmVhY3QnXG4gICAgXSxcbiAgICBleGNsdWRlOiBbXG4gICAgICAnQHRlbnNvcmZsb3cvdGZqcycsIFxuICAgICAgJ0B0ZW5zb3JmbG93L3RmanMtY29yZS9kaXN0L3B1YmxpYy9jaGFpbmVkX29wcy9yZWdpc3Rlcl9hbGxfY2hhaW5lZF9vcHMnXG4gICAgXSxcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgZGVmaW5lOiB7XG4gICAgICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnLFxuICAgICAgICAvLyBBZGQgYWRkaXRpb25hbCBkZWZpbml0aW9ucyB0byBoZWxwIHdpdGggYnJvd3NlciBjb21wYXRpYmlsaXR5XG4gICAgICAgICdwcm9jZXNzLmVudi5OT0RFX0VOVic6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdwcm9kdWN0aW9uJylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIG9wZW46IHRydWUsXG4gICAgY29yczogdHJ1ZVxuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBO0FBQUEsTUFFYixVQUFVO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQTtBQUFBLFFBRU4sYUFBYSxJQUFJO0FBRWYsY0FBSSxHQUFHLFNBQVMsb0JBQW9CLEtBQ2hDLEdBQUcsU0FBUyx3QkFBd0IsR0FBRztBQUN6QyxtQkFBTztBQUFBLFVBQ1Q7QUFHQSxjQUFJLEdBQUcsU0FBUyw0QkFBNEIsS0FDeEMsR0FBRyxTQUFTLDJCQUEyQixHQUFHO0FBQzVDLG1CQUFPO0FBQUEsVUFDVDtBQUdBLGNBQUksR0FBRyxTQUFTLDBCQUEwQixHQUFHO0FBQzNDLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQTtBQUFBLFFBRUEsT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxJQUN2QixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsU0FBUztBQUFBO0FBQUEsSUFFUCxPQUFPO0FBQUEsTUFDTCwwRUFDRTtBQUFBLElBQ0o7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLE1BQ2QsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBO0FBQUEsUUFFUix3QkFBd0IsS0FBSyxVQUFVLFFBQVEsSUFBSSxZQUFZLFlBQVk7QUFBQSxNQUM3RTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
