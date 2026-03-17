import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "./", // ЭТО САМОЕ ГЛАВНОЕ! Меняем на относительные пути
  build: {
    outDir: "docs", // Будем собирать в папку docs для GitHub Pages
  },
});
