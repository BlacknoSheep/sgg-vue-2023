# 2023年b站尚硅谷Vue3项目

链接：https://www.bilibili.com/video/BV1Xh411V7b5

有改动，具体内容见下文。

# 后端

原视频使用的是 [mockjs](http://mockjs.com/) 模拟后端，本项目使用 [express](https://expressjs.com/) 搭建后端。

需要提供一些路由：

- `api/login`：验证登录，若验证通过则返回token。使用 post 方法。
- api/user：检查token是否有效，若有效则根据 token 返回用户信息。使用 get 方法，token 通过 jwt 生成，放在请求头的Authorization字段。
- `404`：处理其他请求

# 前端

## 一、准备

### 1. 使用 vite 创建 vue 项目

```bash
pnpm create vite
pnpm install
```

### 2. 安装需要的包

```bash
pnpm install @types/node -D
pnpm install sass -D
pnpm install element-plus
pnpm install @element-plus/icons-vue
pnpm install pinia
pnpm install pinia-plugin-persistedstate
pnpm install vite-plugin-svg-icons -D
pnpm install fast-glob -D # vite-plugin-svg-icons 需要
pnpm install vue-router
```

### 3. 配置

[管理svg图标](https://github.com/BlacknoSheep/notes/blob/main/vue/17_svg.md) 。

为减小打包后的体积，使用 [cdn 引入插件](https://github.com/BlacknoSheep/notes/blob/main/vue/18_vite.md) 。

