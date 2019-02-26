<template>
  <section class="container">
    <div>
      <div class="grid-content bg-purple container">
        <div class="tagtitle">
          <p :class="{fadetitle: fadetitle}">全部</p>
        </div>
        <ArticleList :articleList="articleList"/>
        <div class="scrollbottomtip">
          <p :class="{ scrolltip: scrolltip }" style="position:relative;top:-15px;height:24px;"></p>
          <div :class="{scrollload:scrollload,scrollloadlast:scrollloadlast}">
            <p>数据加载中</p>
            <i class="el-icon-loading"></i>
          </div>
        </div>
        <p :class="{'hide':lastpage}" class="lastpagetip">我也是有底线的...</p>
      </div>
    </div>
  </section>
</template>

<script>
  import ArticleList from '../components/ArticleList'
  import axios from '~/plugins/axios'

  export default {
    head() {
      return {
        title: 'bug-.net core 专题',
        meta: [
          { hid: 'description', name: 'description', content: 'tbug博客，.netcore,vue,ddd,sqlsugar,web开发，前后端分离,nuxt' },
          { name: 'keywords', content: 'tbug博客，.netcore,vue,ddd,sqlsugar,web开发，前后端分离,nuxt' }
        ]
      }
    },
    data() {
      return {
        page: 1,
        lastpage: true,
        ScrollFirst: true,
        scrolltip: false,
        scrollload: true,
        scrollloadlast: false
      }
    },
    async asyncData({ params }) {
      try {
        const { tag } = params
        // let { data } = await axios.get(`/api/TopicDetail/24`)
        // console.log(data)

        const { data: { response } } = await axios.get(`/api/TopicDetail/get?page=1`)

        return {
          articleList: response.data,
          tagtitle: tag,
          fadetitle: true,
          notfound: !response.data.length
        }
      } catch (err) {
        //error({statusCode: 404})
      }
    },
    components: {
      ArticleList
    },
    mounted() {
      const {newArticlelist} = this.$store.state;
      window.addEventListener('scroll', this.handleScroll);
      if (window.loading) {
        window.loading.close();
      }
      if (newArticlelist.length) {
        this.articleList = newArticlelist;
        return;
      }
    },
    methods: {
      nextpage() {
        debugger
        if (this.lastpage) {
          const {newArticlelist} = this.$store.state;
          if (newArticlelist.length) {
            this.page = Math.ceil(newArticlelist.length / 6)+1;
          } else {
            this.page++;
          }
          axios.get(`/api/TopicDetail/get?page=${this.page}`)
            .then(res => {
              const Articles = res.data.response.data;
              this.articleList = [...this.articleList, ...Articles];
              this.ScrollFirst = true;
              this.scrolltip = false;
              this.scrollload = true;
              if (Articles.length < 6) {
                this.lastpage = false;
                this.scrollloadlast = true;
              }
              this.$store.commit('updatenewlistcon', this.articleList);
            });
        }
      },
      articlesDetailsFn: function(id) {
        this.$router.push({ path: `/details/${id}` })
      },
      handleScroll() {
        const jrscrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollT
        let scrollBottom = document.body.clientHeight - window.innerHeight - jrscrollTop
        if (scrollBottom < 30) {
          if (this.ScrollFirst) {
            this.scrolltip = true
            this.scrollload = false
            this.ScrollFirst = false
            this.nextpage()
          }
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll, false)
    }
  }
</script>

