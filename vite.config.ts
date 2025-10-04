import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1000kB
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: split vendor code
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
}));
