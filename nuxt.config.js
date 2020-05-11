const webpack = require('webpack')


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
  vender:[
    'element-ui', 'axios', '~untils/index.js'
  ],

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
    { src: '~plugins/element-ui', ssr: true },
    { src: '~plugins/nuxt-markdown.js',ssr: false  },
    { src: "~plugins/server_site/index", ssr: false }

  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
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
    build: {
      vendor: ['axios', 'Button', 'Input', 'Tabs', 'Message', 'TabPane', 'Row', 'Col', 'Loading', 'Notification', 'Icon']
    },
    analyze: false,
    plugins: [
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(`^./(${['javascript', 'css', 'php', 'sql', 'python', 'bash'].join('|')})$`),
      )
    ],
    babel: {

    },
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {

    },
  },
  proxy: [
    ['/api', { target: 'http://localhost:8081' }],//这里改成你自己的后端api端口地址，记得每次修改，都需要重新build
    ['/images', { target: 'http://localhost:8081' }],
    // ['/api', { target: 'http://123.206.33.109:8081' }],
    //['/images', { target: 'http://123.206.33.109:8081' }],
  ]
}
