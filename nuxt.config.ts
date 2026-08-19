// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/sitemap'
  ],

  components: [
    {
      path: '~/components/ui',
      pathPrefix: false
    },
    '~/components'
  ],

  site: {
    url: 'https://mpwt.dev',
    name: 'Department of Information Technology Systems - MPWT'
  },

  i18n: {
    locales: [
      { code: 'km', iso: 'km-KH', name: 'ភាសាខ្មែរ', file: 'km.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
    ],
    lazy: false,
    langDir: 'i18n/locales',
    defaultLocale: 'km',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  sitemap: {
    exclude: ['/admin/**']
  },

  app: {
    head: {
      title: 'នាយកដ្ឋានប្រព័ន្ធបច្ចេកវិទ្យាព័ត៌មាន | Department of IT Systems - MPWT',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Official portal of the Department of Information Technology Systems, Directorate General of GDPTR, Ministry of Public Works and Transport (MPWT).' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:site_name', content: 'MPWT IT Systems' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/logo.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        { rel: 'apple-touch-icon', href: '/logo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Google+Sans+Text:wght@400;500;700&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Khmer:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },

  nitro: {
    imports: {
      dirs: ['./server/utils']
    }
  }
})
