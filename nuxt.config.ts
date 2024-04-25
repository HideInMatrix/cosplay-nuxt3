// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@ant-design-vue/nuxt"],
  css: ["ant-design-vue/dist/reset.css"],
  routeRules: {
    "/": { prerender: true },
  },
  vite: {
    resolve: {
      alias: {
        "ant-design-vue/dist": "ant-design-vue/dist",
        "ant-design-vue/es": "ant-design-vue/es",
        "ant-design-vue/lib": "ant-design-vue/es",
        "ant-design-vue": "ant-design-vue/es",
      },
    },
  },
});
