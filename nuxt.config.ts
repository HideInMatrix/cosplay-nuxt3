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
      script: [],
      meta: [
        {
          hid: "micromatrix",
          name: "写真网站",
          content: "免费的写真网站",
        },
      ],
    },
    layoutTransition: { name: "layout", mode: "out-in" },
    keepalive: {
      exclude: ["cosplay", "cosers", "cosplays/[id]"], // 需要缓存的页面
    },
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
        onPageLoad: true, // this is required to be true for our ads to show in our
        test: false, // if we are using development env. the test variable will help us to show where your ads will appear
      },
    ],
    "@sidebase/nuxt-auth",
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
  auth: {
    provider: {
      type: "local",
      endpoints: {
        signIn: {
          path: "/api/users/login",
          method: "post",
        },
      },
      token: { signInResponseTokenPointer: "/token/accessToken" },
    },
  },
});
