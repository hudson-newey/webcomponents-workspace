import { defineConfig } from "vite";
import VitePluginCustomElementsManifest from "vite-plugin-cem";

export default defineConfig({
  plugins: [
    VitePluginCustomElementsManifest({
      files: ["./src/components/todoList/todoList.ts"],
      lit: true,
    }),
  ],
  build: {
    lib: {
      name: "todoList",
      fileName: "todoList",
      entry: "src/components/todoList/todoList.ts",
      formats: ["es"],
    },
  },
});
