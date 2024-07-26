import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 80, // กำหนดพอร์ตสำหรับ frontend
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Proxy requests to the API server
      },
    },
    watch: {
      usePolling: true, // Optional: If you're using a network file system or other file watcher issue
    },
  },
  build: {
    outDir: "dist",
  },
});
