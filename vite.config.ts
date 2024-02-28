import { defineConfig } from "vite";
import VitePluginCustomElementsManifest from "vite-plugin-cem";
import image from "@rollup/plugin-image";

export default defineConfig({
  plugins: [
    image(),
    VitePluginCustomElementsManifest({
      files: ["./src/components/**/*.ts"],
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
} as any);
