import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
// 管理svg
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import CdnImportPlugin, { CdnImportMap } from "./plugins/rollup-plugin-cdn-import";

const externalMap: CdnImportMap = {
  vue: {
    globalVal: "Vue",
    cdn: "https://unpkg.com/vue@3/dist/vue.global.prod.js",
  },
  "element-plus": {
    globalVal: "ElementPlus",
    cdn: "https://unpkg.com/element-plus@2.4.2/dist/index.full.min.js",
  },
  "element-plus/dist/index.css": {
    globalVal: "",
    cdn: "https://unpkg.com/element-plus/dist/index.css",
  },
  "@element-plus/icons-vue": {
    globalVal: "ElementPlusIconsVue",
    cdn: "https://unpkg.com/@element-plus/icons-vue",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      "~": path.resolve("./"),
    },
  },
  // 使用相对路径
  base: "./",
  build: {
    rollupOptions: {
      // 外部化依赖，不会打包到库中 https://cn.rollupjs.org/configuration-options/#external
      external: [...Object.keys(externalMap)],
      plugins: [CdnImportPlugin(externalMap)],
    },
  },
});
