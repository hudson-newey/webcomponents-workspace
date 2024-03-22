import { defineConfig } from "vite";
import VitePluginCustomElementsManifest from "vite-plugin-cem";
import url from "@rollup/plugin-url";

// vite config for the dev server and documentation
export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest({
      files: ["./src/components/**/*.ts"],
      lit: true,
    }),
    url({
      fileName: "[name][extname]",
      include: ["**/*.flac"],
      limit: 100000,
    }),
  ],
  server: {},
});
