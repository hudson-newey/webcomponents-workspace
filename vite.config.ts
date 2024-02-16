import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  console.log("build type:", mode);

  return {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "todoList.js",
        },
      },
      lib: {
        entry: "src/components/todoList/todoList.ts",
        formats: ["es"],
      },
    },
  };
});
