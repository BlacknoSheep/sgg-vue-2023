import type { RouteRecordRaw } from "vue-router";

// 定义路由
const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/Home/index.vue"),
    name: "home",
  },
  {
    path: "/login",
    // 访问 /login 时加载 Login 组件
    component: () => import("@/views/Login/index.vue"),
    name: "login",
  },
  {
    path: "/register",
    component: () => import("@/views/Register/index.vue"),
    name: "register",
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "not-found",
  },
];

export { staticRoutes };
