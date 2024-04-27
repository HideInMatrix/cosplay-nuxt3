// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-icon", "nuxt-gtag"],
  routeRules: {
    "/": { prerender: true },
  },
  ui: {
    icons: ["flat-color-icons"],
  },
  gtag: {
    id: "15MZJRZZB1",
  },
});
