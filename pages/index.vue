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
  import ArticleList from '../components/ArticleList';

  export default {
    head () {
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
        page: 0,
        lastpage: true,
        ScrollFirst: true,
        scrolltip: false,
        scrollload: true,
        scrollloadlast: false,
      };
    },
    async asyncData ({params}) {
      try {
        const {tag} = params;
        let Article=[
          {
            "label": [
              "vue",
              "html5"
            ],
            "user": [
              {
                "name": "lao zhang"
              }
            ],
            "_id": "5aed92f028e94e763ff29ede",
            "title": "注入失败：Unable to resolve service for type 'xxx' while attempting to activate 'xxx.controller'",
            "date": "2018-05-05",
            "state": "publish",
            "introduce": "这个是依赖注入中出现的问题，在将接口注入到控制器的时候",
            "tag": "vue",
            "__v": 0
          },

          {
            "label": [
              "vue",
              "html5"
            ],
            "user": [
              {
                "name": "lao zhang"
              }
            ],
            "_id": "5aed91f028e94e763ff29ede1",
            "title": "注入失败：Unable to resolve service for type 'xxx' while attempting to activate 'xxx.controller'",
            "date": "2018-05-05",
            "state": "publish",
            "introduce": "这个是依赖注入中出现的问题，在将接口注入到控制器的时候",
            "tag": "vue",
            "__v": 0
          },

          {
            "label": [
              "vue",
              "html5"
            ],
            "user": [
              {
                "name": "lao zhang"
              }
            ],
            "_id": "5aed92f028e94e763ff29ede2",
            "title": "注入失败：Unable to resolve service for type 'xxx' while attempting to activate 'xxx.controller'",
            "date": "2018-05-05",
            "state": "publish",
            "introduce": "这个是依赖注入中出现的问题，在将接口注入到控制器的时候",
            "tag": "vue",
            "__v": 0
          },

          {
            "label": [
              "vue",
              "html5"
            ],
            "user": [
              {
                "name": "lao zhang"
              }
            ],
            "_id": "5aed92f028e94e763ff29ede3",
            "title": "注入失败：Unable to resolve service for type 'xxx' while attempting to activate 'xxx.controller'",
            "date": "2018-05-05",
            "state": "publish",
            "introduce": "这个是依赖注入中出现的问题，在将接口注入到控制器的时候",
            "tag": "vue",
            "__v": 0
          },

          {
            "label": [
              "vue",
              "html5"
            ],
            "user": [
              {
                "name": "lao zhang"
              }
            ],
            "_id": "5aed92f028e94e763ff29ede4",
            "title": "注入失败：Unable to resolve service for type 'xxx' while attempting to activate 'xxx.controller'",
            "date": "2018-05-05",
            "state": "publish",
            "introduce": "这个是依赖注入中出现的问题，在将接口注入到控制器的时候",
            "tag": "vue",
            "__v": 0
          },

          {
            "label": [
              "vue",
              "html5"
            ],
            "user": [
              {
                "name": "lao zhang"
              }
            ],
            "_id": "5aed92f028e94e763ff29ede5",
            "title": "注入失败：Unable to resolve service for type 'xxx' while attempting to activate 'xxx.controller'",
            "date": "2018-05-05",
            "state": "publish",
            "introduce": "这个是依赖注入中出现的问题，在将接口注入到控制器的时候",
            "tag": "vue",
            "__v": 0
          },

          {
            "label": [
              "vue",
              "html5"
            ],
            "user": [
              {
                "name": "lao zhang"
              }
            ],
            "_id": "5aed92f028e94e763ff29ede6",
            "title": "注入失败：Unable to resolve service for type 'xxx' while attempting to activate 'xxx.controller'",
            "date": "2018-05-05",
            "state": "publish",
            "introduce": "这个是依赖注入中出现的问题，在将接口注入到控制器的时候",
            "tag": "vue",
            "__v": 0
          },

          {
            "label": [
              "vue",
              "html5"
            ],
            "user": [
              {
                "name": "lao zhang"
              }
            ],
            "_id": "5aed92f028e94e763ff29ede7",
            "title": "注入失败：Unable to resolve service for type 'xxx' while attempting to activate 'xxx.controller'",
            "date": "2018-05-05",
            "state": "publish",
            "introduce": "这个是依赖注入中出现的问题，在将接口注入到控制器的时候",
            "tag": "vue",
            "__v": 0
          },

        ]
        return {
          articleList: Article,
          tagtitle: tag,
          fadetitle: true,
          notfound: !Article.length
        };
      } catch (err) {
        // error({statusCode: 404})
      }
    },
    components: {
      ArticleList
    },
    methods: {
      nextpage() {

      },
      articlesDetailsFn: function(id){
        this.$router.push({ path: `/details/${id}`});
      },
      handleScroll() {
        const jrscrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollT;
        let scrollBottom = document.body.clientHeight - window.innerHeight - jrscrollTop;
        if (scrollBottom < 30) {
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

