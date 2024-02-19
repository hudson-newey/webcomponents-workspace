import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      name: "todoList",
      fileName: "todoList",
      entry: "src/components/todoList/todoList.ts",
      formats: ["es"],
    },
  },
});
