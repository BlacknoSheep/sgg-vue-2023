import { createApp } from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 国际化
import zhCn from "element-plus/es/locale/lang/zh-cn";
// 管理svg
import "virtual:svg-icons-register";
// 注册全局组件
import GlobalComponentsPlugin from "@/components/index.ts";

import "@/styles/index.scss";
import router from "./router";

const app = createApp(App);
app.use(GlobalComponentsPlugin);
app.use(ElementPlus, { locale: zhCn });
app.use(router);
app.mount("#app");
