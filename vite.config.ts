import { defineConfig } from "vite";

export default defineConfig({
  server: {
  },
  build: {
    lib: {
      name: "todoList",
      fileName: "todoList",
      entry: "src/components/todoList/todoList.ts",
      formats: ["es"],
    },
  },
});
