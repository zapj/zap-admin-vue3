# zap-admin-vue3

ZapAdmin 后台管理系统前端项目，基于 Vue3 + Vite + Vue-Router + Vuex + Element-Plus 开发。

# 项目结构
    ├── public
    │   └── favicon.ico
    ├── src
    │   ├── api
    │   │   └── index.ts
    │   ├── assets
    │   │   └── logo.png
    │   ├── components
    │   │   └── HelloWorld.vue
    │   ├── router
    │   │   └── index.ts
    │   ├── store
    │   │   └── index.ts
    │   ├── App.vue
    │   ├── main.ts
    │   └── shims.d.ts
    ├── index.html
    ├── package.json
    └── vite.config.ts      

# 项目预览
![项目预览](zap-admin-vue3-snap.png)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## 项目安装

```sh
npm install
```

### Compile and Hot-Reload for Development (vite)

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
