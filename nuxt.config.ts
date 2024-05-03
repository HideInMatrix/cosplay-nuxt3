// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "写真网站",
      link: [
        {
          rel: "icon",
          type: "image/vnd.microsoft.icon",
          href: "/icon/favicon.ico",
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/supabase",
    // "@zadigetvoltaire/nuxt-gtm",
    "nuxt-lodash",
    "@nuxt/image",
    "@nuxt/content",
  ],
  routeRules: {
    "/": { prerender: true },
  },
  ui: {
    icons: ["flat-color-icons"],
  },
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    redirect: false,
  },
});
