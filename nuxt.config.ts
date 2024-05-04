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
    [
      "@nuxtjs/google-adsense",
      {
        id: process.env.NUXT_PUBLIC_GOOGLE_ADS_ID, // replace "#" with "2112345678904791",
        onPageLoad: false, // this is required to be true for our ads to show in our
        test: false, // if we are using development env. the test variable will help us to show where your ads will appear
      },
    ],
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
});
