import { createRouter, createWebHashHistory } from "vue-router";
import { staticRoutes } from "./routes";

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
  scrollBehavior(to, from, savedPosition) {
    return {
      left: 0,
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
