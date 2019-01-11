const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** 页面头信息
  */
  head: {
    title: 'tBug，一个专业的解决bug平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'tbug博客，.netcore,vue,ddd,sqlsugar,web开发，前后端分离,nuxt' },
      { hid: 'description', name: 'description', content: 'tbug博客，.netcore,vue,ddd,sqlsugar,web开发，前后端分离,nuxt' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** 自定义加载条的样式
  */
  loading: { color: '#44C1B8', height: '4px' },

  /*
  ** 全局CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    { src: "mavon-editor/dist/css/index.css" },
    {src: '@/style/style.css', lang: 'css'}
  ],

  /*
  ** 在安装app之前，加载插件
  */
  plugins: [
    '@/plugins/element-ui',
    {
      src: '~plugins/nuxt-markdown.js',
      ssr: false //仅在客户端渲染
    }

  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    },



  }
}
