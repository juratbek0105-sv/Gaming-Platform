export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: '', // Will be overridden by NUXT_PUBLIC_API_BASE
    }
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'uz' },
      title: "JAMOA — O'yinchilar platformasi",
      titleTemplate: '%s | JAMOA',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: "JAMOA — O'zbekiston o'yinchilari uchun ijtimoiy platforma. Guruhlar, turnirlar, va o'yin jamiyati." },
        { name: 'keywords', content: "gaming, esports, valorant, cs2, pubg, o'zbekiston, jamoa, turnir" },
        { name: 'author', content: 'JAMOA' },
        { name: 'theme-color', content: '#7c3aed' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'JAMOA' },
        { property: 'og:title', content: "JAMOA — O'yinchilar platformasi" },
        { property: 'og:description', content: "O'zbekiston o'yinchilari uchun ijtimoiy platforma. Guruhlar, turnirlar, va o'yin jamiyati." },
        { property: 'og:locale', content: 'uz_UZ' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'JAMOA Gaming Platform' },
        { name: 'twitter:description', content: "O'zbekiston o'yinchilari uchun platforma" },
        // PWA
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap' },
      ],
    },
    pageTransition: { name: 'fade-slide', mode: 'out-in' },
  },
})