require('dotenv').config();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SoftFactory | Разработка программного обеспечения',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: `
Создадим сайт, интернет-магазин, чат-бот для ВКонтакте \
или Telegram, программу под Windows и другое по доступной цене.` },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://unicons.iconscout.com/release/v2.1.6/css/unicons.css' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/fonts.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/recaptcha',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
  ],

  recaptcha: {
    version: 2,
    siteKey: process.env.RECAPTCHA_SECRET,
    size: 'invisible',
  },

  axios: {
    baseURL: process.env.API_URL || 'http://127.0.0.1:1337',
    headers: {
      common: {
        'Authorization': 'Bearer ' + process.env.API_TOKEN,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
