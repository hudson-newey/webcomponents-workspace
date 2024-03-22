import { defineConfig } from "vite";

// vite config for building components
export default defineConfig({
  server: {},
  build: {
    outDir: "js",
    lib: {
      name: "components",
      fileName: "components",
      entry: "index.ts",
      formats: ["es"],
    },
  },
});
