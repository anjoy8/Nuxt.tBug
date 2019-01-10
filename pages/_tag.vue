<template>
  <div id="tag" class="container">
    <div class="tagtitle">
      <p :class="{fadetitle: fadetitle}">{{tagtitle}}</p>
    </div>
    <ArticleList :articleList="tagList"/>
    <div class="notfound" :class="{'shownotfound':notfound}">
      <img src="http://img.binlive.cn/upload/1525014468729"
           alt="binlive个人技术博客vue、react、node">
    </div>
    <div class="scrollbottomtip" >
      <p :class="{scrolltip: scrolltip}" style="position:relative;top:-15px;height:24px"></p>
      <div :class="{scrollload:scrollload, scrollloadlast:scrollloadlast}">
        <p>数据加载中</p>
        <i class="el-icon-loading"></i>
      </div>
    </div>
    <p :class="{'hide':lastpage}" class="lastpagetip">没有更多数据了...</p>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import ArticleList from '../components/ArticleList';

  export default {
    name: 'tag',
    head () {
      return {
        title: this.tagtitle,
        meta: [
          { hid: 'description', name: 'description', content: `${this.tagtitle},前端开发,前端,web前端开发,node,vue,react,webpack,git` },
          { name: 'keywords', content: this.tagtitle }
        ]
      }
    },
    data() {
      return {
        page: 0,
        lastpage: true,
        ScrollFirst: true,
        scrolltip: false,
        scrollload: true,
        scrollloadlast: false,
      };
    },
    asyncData: async function({ params }) {
      try {
        const { tag } = params
        // const {data: {Article}} = await axios.get(`/api/getArticleLabel/${tag}/0`);
        let Article = [
          {
            'label': [
              'vue',
              'javascript'
            ],
            'user': [
              {
                'name': '韩兆赟'
              }
            ],
            '_id': '5b3052884a8e58748e7226bd',
            'title': '适配mpvue平台的的微信小程序日历组件mpvue-calendar',
            'date': '2018-06-25T02:25:12.000Z',
            'state': 'publish',
            'introduce': 'mpvue-calendar是基于mpvue平台的小程序日历组件，mpvue修改了 Vue.js 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 Vue.js 开发体验。',
            'tag': 'vue',
            '__v': 0
          },
          {
            'label': [
              'vue',
              'html5'
            ],
            'user': [
              {
                'name': '韩兆赟'
              }
            ],
            '_id': '5aed92f028e94e763ff29ede',
            'title': 'vue图片上传预览裁剪组件，支持移动端放大缩小平移。',
            'date': '2018-05-05T11:18:16.000Z',
            'state': 'publish',
            'introduce': 'vue-imageClip是一个基于vue的图片裁剪组件，支持在线预览、移动缩放。',
            'tag': 'vue',
            '__v': 0
          },
          {
            'label': [
              'vue',
              'node'
            ],
            'user': [
              {
                'name': '韩兆赟'
              }
            ],
            '_id': '5aec85e528e94e763ff29edd',
            'title': 'Nuxt.js服务端渲染、接口转发和部署',
            'date': '2018-05-04T16:10:13.000Z',
            'state': 'publish',
            'introduce': 'Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染；集成了webapck和vue-mate等，可用于解决传统SPA页面渲染中的SEO问题。',
            'tag': 'vue',
            '__v': 0
          },
          {
            'label': [
              'vue',
              'javascript'
            ],
            'user': [
              {
                'name': '韩兆赟',
                'html_url': 'https://github.com/Hzy0913',
                'avatar_url': 'https://avatars5.githubusercontent.com/u/22450881?v=4'
              }
            ],
            '_id': '59a144b84c59bf0df66c63fc',
            'title': 'vue2.0路由对象和编程式路由',
            'date': '2017-08-26T09:51:52.000Z',
            'state': 'publish',
            'tag': 'vue',
            '__v': 0,
            'introduce': '在使用了 vue-router 的应用中，我们如何操作路由对象、获取路由信息。'
          },
          {
            'label': [
              'vue',
              'javascript'
            ],
            'user': [
              {
                'name': '韩兆赟',
                'html_url': 'https://github.com/Hzy0913',
                'avatar_url': 'https://avatars5.githubusercontent.com/u/22450881?v=4'
              }
            ],
            '_id': '599fd43e155a70758fef856b',
            'title': 'vue2.0组件间事件派发与接收',
            'date': '2017-08-25T07:39:41.000Z',
            'state': 'publish',
            'tag': 'vue',
            '__v': 0,
            'introduce': '在vue中有时候我们需要两个组件之间通信传递数据 ,官方的给出的最简单的升级建议是使用集中的事件处理器,而且也明确说明了一个空的vue实例就可以做到,因为Vue 实例实现了一个事件分发接口。'
          },
          {
            'label': [
              'vue',
              'javascript'
            ],
            'user': [
              {
                'name': '韩兆赟',
                'html_url': 'https://github.com/Hzy0913',
                'avatar_url': 'https://avatars5.githubusercontent.com/u/22450881?v=4'
              }
            ],
            '_id': '599422a7971b027d7be1b216',
            'title': 'Vue js 的生命周期详解',
            'date': '2017-08-16T10:47:01.000Z',
            'state': 'publish',
            'tag': 'vue',
            '__v': 0,
            'introduce': '用Vue框架，熟悉它的生命周期可以让开发更好的进行。因为我们有时候会在几个钩子函数里做一些事情，什么时候做，在哪个函数里做，了解vue的生命周期是十分必要的。'
          },
          {
            'label': [
              'vue'
            ],
            'user': [
              {
                'name': '韩兆赟',
                'html_url': 'https://github.com/Hzy0913',
                'avatar_url': 'https://avatars5.githubusercontent.com/u/22450881?v=4'
              }
            ],
            '_id': '59941d24971b027d7be1b215',
            'title': 'vuex使用方法详解',
            'date': '2017-08-16T10:23:31.000Z',
            'state': 'publish',
            'tag': 'vue',
            '__v': 0,
            'introduce': 'Vuex 是一个专为 Vue.js 的SPA单页组件化应用程序开发的状态管理模式插件。'
          },
          {
            'label': [
              'vue'
            ],
            'user': [
              {
                'name': '韩兆赟',
                'html_url': 'https://github.com/Hzy0913',
                'avatar_url': 'https://avatars5.githubusercontent.com/u/22450881?v=4'
              }
            ],
            '_id': '5993c2abf4b8577b33c02f7f',
            'title': '详解vue-router 2.0 常用基础知识点之router.push()',
            'date': '2017-08-16T03:57:30.000Z',
            'state': 'publish',
            'tag': 'vue',
            '__v': 0,
            'introduce': '本篇文章主要介绍了vue-router 2.0 常用基础知识点之router.push(),包括push的各类常用用法。'
          },
          {
            'label': [
              'vue'
            ],
            'user': [
              {
                'name': '韩兆赟',
                'html_url': 'https://github.com/Hzy0913',
                'avatar_url': 'https://avatars5.githubusercontent.com/u/22450881?v=4'
              }
            ],
            '_id': '598ad64bc35d41539bc55300',
            'title': 'vue-router 2.0 常用基础知识点之导航钩子',
            'date': '2017-08-09T09:30:50.000Z',
            'state': 'publish',
            'tag': 'vue',
            '__v': 0,
            'introduce': 'vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的。'
          }
        ]

        return {
          tagList: Article,
          tagtitle: tag,
          fadetitle: true,
          notfound: !Article.length
        }
      } catch (err) {
        //error({statusCode: 404})
      }
    },
    components: {
      ArticleList
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      if (window.loading) {
        window.loading.close();
      }
    },
    methods: {
      nextpage() {
        const tag = this.$route.params.tag;
        if (this.lastpage&&false) {
          this.page++;
          const page = this.page;
          axios.get(`/api/getArticleLabel/${tag}/${page}`)
            .then(res => {
              this.tagList = [...this.tagList, ...res.data.Article];
              this.ScrollFirst = true;
              this.scrolltip = false;
              this.scrollload = true;
              if (res.data.Article.length < 10) {
                this.lastpage = false;
                this.scrolltip = true;
                this.scrollloadlast = true;
              }
              this.$store.commit('updatetaglistcon', this.tagList);
              this.articleList = this.$store.state.newlistcon;
            })
            .catch(err => this.ScrollFirst = true);
        }
      },
      handleScroll() {
        let jrscrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollT;
        let scrollBottom = document.body.clientHeight - window.innerHeight - jrscrollTop;
        if (scrollBottom < 10) {
          if (this.ScrollFirst) {
            this.scrolltip = true;
            this.scrollload = false;
            this.ScrollFirst = false;
            this.nextpage();
          }
        }
      }
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.handleScroll, false);
    }
  };

</script>

<style scoped>
  .lastpagetip {
    font-size: 14px
  }
  .shownotfound {
    display: block !important
  }
  .notfound {
    width: 100%;
    padding-top: 40px;
    display: none
  }
  .notfound img {
    width: 60%;
    margin: 0 auto;
    display: block
  }
</style>
