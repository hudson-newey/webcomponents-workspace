import { defineConfig } from "@sand4rt/experimental-ct-web";
import { resolve } from "path";

export default defineConfig({
  testDir: "src/components",
  use: {
    trace: "on-first-retry",
    ctViteConfig: {
      resolve: {
        alias: {
          "@": resolve("./src"),
        },
      },
    },
  },
});
