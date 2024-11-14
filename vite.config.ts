import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.app.json",
      entryRoot: "./src/lib",
      insertTypesEntry: true,
    }),
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/lib/index.ts", import.meta.url)),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        entryFileNames: "[name].js",
        preserveModules: true,
      },
    },
  },
});
