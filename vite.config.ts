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
      name: "todoList",
      fileName: "todoList",
      entry: "src/components/todoList/todoList.ts",
      formats: ["es"],
    },
  },
});
