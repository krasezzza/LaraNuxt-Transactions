const publicConfig = {
  API_URL: 'http://localhost:8080'
}

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  publicRuntimeConfig: publicConfig,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/_common.scss',
    '@/assets/css/_mobile.scss',
    '@/assets/css/_snackbar.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api',
    '~/plugins/toast',
    '~/plugins/format',
    '~/plugins/vuelidate'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/date-fns'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  router: {
    middleware: ['auth']
  },

  axios: {
    baseUrl: publicConfig.API_URL,
    credentials: true
  },

  auth: {
    redirect: {
      login: false,
      logout: false,
      home: false,
      callback: false
    },
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: publicConfig.API_URL
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: [
      '~/assets/css/variables.scss'
    ],
    defaultAssets: {
      font: false
    },
    theme: {
      options: {
        customProperties: true
      },
      themes: {
        light: {
          primary: {
            base: '#0d8398',
            lighten: '#a8dce8'
          },
          secondary: '#ee7035',
          accent: '#d01677',
          info: '#167fb5',
          warning: '#c99519',
          error: '#ba2322',
          success: '#16a37f',
          grey: {
            base: '#666666',
            lighten: '#EEEEEE',
            darken: '#333333'
          },
          'transaction-send': '#d01677',
          'transaction-received': '#c99519',
          'transaction-paid': '#16a37f'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
