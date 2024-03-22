import { defineConfig } from "vite";
import VitePluginCustomElementsManifest from "vite-plugin-cem";

export default defineConfig({
  // TODO: we might want to use the lit compiler here lit.dev/blog/2023-10-10-lit-3.0
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
