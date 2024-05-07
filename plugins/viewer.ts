import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
export default defineNuxtPlugin({
  name: "viewer",
  enforce: process.server ? "pre" : "post", // 或 'post'
  async setup(nuxtApp) {
    // 这相当于一个普通的功能性插件
    nuxtApp.vueApp.use(Viewer, {
      defaultOptions: {
        button: false,
        navbar: false,
        title: false,
        tooltip: false,
      },
    });
  },
  hooks: {
    // 这里可以直接注册Nuxt应用运行时钩子
    "app:created"() {
      // const nuxtApp = useNuxtApp();
      //
    },
  },
  env: {
    // 如果不希望插件在仅渲染服务器端或孤立组件时运行，请将此值设置为`false`。
    islands: false,
  },
});
