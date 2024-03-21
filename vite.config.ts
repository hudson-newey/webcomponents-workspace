import { defineConfig } from "vite";
import VitePluginCustomElementsManifest from "vite-plugin-cem";

export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest({
      files: ["./src/components/**/*.ts"],
      lit: true,
    }),
  ],
  server: {},
  build: {
    lib: {
      name: "web-components",
      fileName: "web-components",
      entry: "src/components/index.ts",
      formats: ["es"],
    },
  },
});
