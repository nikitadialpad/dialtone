import { title } from './docs/_data/site.json'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title,
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
      // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css' }
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/dialtone.less',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/docsearch-client.js', mode: 'client' },
    { src: '~/plugins/dialtone-components.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  build: {
    hotMiddleware: {
      client: {
        // turn off client overlay when errors are present
        overlay: false
      }
    }
  },

  eslint: {
    fix: true
  },

  server: {
    port: 4000
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content'
  ],

  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-one-dark.css'
      },
      remarkPlugins: [
        [
          "remark-autolink-headings",
          {
            behavior: "append",
            linkProperties: {
              className: ["d-btn d-btn--muted d-pe-auto active"]
            },
            content: {
              type: "element",
              tagName: "span",
              properties: {
                className: ["d-btn__icon d-m0 d-ai-center"]
              }
            }
          }
        ]
      ]
    }
  },
}
