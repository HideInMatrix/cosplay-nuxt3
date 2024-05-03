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
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/supabase",
    "nuxt-lodash",
    "@nuxt/image",
    "@nuxt/content",
    "nuxt-gtag",
    "@nuxtjs/google-adsense",
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
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID,
  },
  googleAdsense: {
    id: process.env.NUXT_PUBLIC_GOOGLE_ADS_ID,
    analyticsDomainName: process.env.NUXT_PUBLIC_URL,
  },
});
