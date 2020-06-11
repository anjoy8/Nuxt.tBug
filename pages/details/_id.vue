<template>
  <div id="articlesDetails" class="fadein">
       <div class="detail-header">
      <h1>{{response.tdName}}</h1>
      <!-- <div class="time">
        <el-button
          @click="articlesDetailsFn(response.Id)"
          style="margin-right: 10px;"
          type="primary"
          icon="el-icon-edit"
          circle
        ></el-button>
      </div> -->
      <div class="detail-body-tag">
        <!--<span v-for="list in articleDetails.label" :key="list" class="tag">{{list}}</span>-->
      </div>
    </div>
    <div class="detail-body" v-html="markHtml"></div>
    <div class="detail-footer"></div>
    <div v-show="background" class="background">
      <div class="img-wrapper">
        <img :src="backgroundImg" class="background-animate" />
      </div>
      <img src="../../assets/close.png" class="close" @click="hidePrview" />
    </div>
  </div>
</template>

<script>
import { dateFormat } from '../../utils/index'
import marked from 'marked'

import Vue from 'vue'
import axios from '~/plugins/axios'

import highlight from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import php from 'highlight.js/lib/languages/php'
import python from 'highlight.js/lib/languages/python'
import sql from 'highlight.js/lib/languages/sql'
import bash from 'highlight.js/lib/languages/bash'

highlight.registerLanguage('javascript', javascript)
highlight.registerLanguage('css', css)
highlight.registerLanguage('php', php)
highlight.registerLanguage('python', python)
highlight.registerLanguage('sql', sql)
highlight.registerLanguage('bash', bash)

// import '../../assets/hybrid.css'
// import applicationUserManager from '~/plugins/Auth/applicationusermanager'
// import userAuth from '~/plugins/Auth/UserAuth'

dateFormat()

export default {
  async asyncData({ params, error, redirect }) {
    try {
      const { id } = params

      const {
        data: { response }
      } = await axios.get('/api/TopicDetail/get/' + id)

      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function(code, lang) {
          return highlight.highlightAuto(code).value
        }
      })
      const markHtml = marked(response.tdContent)
      return { response, markHtml }
    } catch (err) {
      if (err.response && err.response.status == 401) {
        //这里使用Id4授权认证，用Jwt，请删之；
        // applicationUserManager.login();
        // return redirect('/login')
      } else {
        error({ statusCode: 404 })
      }
    }
  },
  name: 'Articledetails',
  // mixins: [userAuth],
  data() {
    return {
      background: false,
      backgroundImg: ''
    }
  },
  head() {
    return {
      title: this.response.tdName || 'binlive',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${
            this.response.tdName
          },前端开发,前端,web前端开发,node,vue,react,webpack,git`
        },
        { name: 'keywords', content: this.response.tdName }
      ]
    }
  },
  mounted() {
    document.querySelectorAll('.detail-body img').forEach(item => {
      item.addEventListener('click', () => {
        document.documentElement.style.overflow = 'hidden'
        this.background = true
        this.backgroundImg = item.src
      })
    })

    if (window.loading) {
      window.loading.close()
    }
  },
  methods: {
    delArticlesDetailsFn: function(id) {
      let that = this
      var curTime = new Date()
      var expiretime = new Date(Date.parse(window.localStorage.TokenExptire))

      if (
        window.localStorage.Token &&
        window.localStorage.Token.length >= 128 &&
        !(curTime >= expiretime || !window.localStorage.TokenExptire)
      ) {
        that
          .$confirm('确定要删除该内容?', '注意！', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            axios.delete('/api/TopicDetail/delete?id=' + id).then(respone => {
              debugger
              if (respone.data.success) {
                that.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success'
                })
                this.$router.push({ path: `/` })
              }
            })
          })
          .catch(() => {})
      } else {
        
        //这里使用Id4授权认证，用Jwt，请删之；
        // applicationUserManager.login();
        //this.$router.push({ path: `/login?redirect=/details/${id}` })
      }
    },
    articlesDetailsFn: function(id) {
        this.$router.push({ path: `/tibug/${id}` })
      if (
        window.localStorage.Token &&
        window.localStorage.Token.length >= 128
      ) {
        this.$router.push({ path: `/tibug/${id}` })
      } else {
        //这里使用Id4授权认证，用Jwt，请删之；
        // applicationUserManager.login();
        // this.$router.push({ path: `/login?redirect=/details/${id}` })
      }
    },
    hidePrview() {
      this.background = false
      this.backgroundImg = ''
      document.documentElement.style.overflow = 'auto'
    }
  },
  computed: {
    authUrl() {
      const id = this.$route.params.id
      return ``
    }
  },
  components: {},
  beforeDestroy() {
    window.loading = this.$loading({
      lock: true,
      text: 'Loading',
      background: 'rgba(255, 255, 255, 0.7)'
    })
  }
}
</script>

<style scoped>
@keyframes fadeInRight {
  from {
    opacity: 0.6;
    transform: translate3d(20px, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.fadein {
  animation-name: fadeInRight;
  animation-duration: 1s;
  animation-fill-mode: both;
}

.detail-body pre {
  background-color: #282a36 !important;
}

#articlesDetails {
  height: 100vh;
  overflow: scroll;
  text-align: center;
  /*padding: 0 1rem;*/
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  opacity: 1;
  -webkit-transform: translate3d(0, 10px, 0);
  transform: translate3d(0, 10px, 0);
}

.detail-header {
  /*width: 140%;*/
  margin-left: -20%;
  background-color: #8fbdc7;
  /* min-height: 150px; */
  padding-left: 20%;
}

.detail-header > h1 {
  font-size: 24px;
  color: #fff;
  font-weight: 900;
  padding-top: 20px;
  text-align: left;
  padding-left: 20px;
  padding-bottom: 20px;
  max-height: 250px;
}

.detail-header .time {
  font-size: 14px;
  color: #f2f2f2;
  text-align: left;
  padding-left: 22px;
}

.detail-body-tag {
  padding-left: 22px;
}

.detail-body-tag span {
  float: left;
  border-radius: 2px;
  padding: 4px 8px;
  background-color: #fff;
  margin-right: 10px;
  box-shadow: 1px 1px 1px rgba(2, 58, 114, 0.1);
}

.detail-body-tag span:nth-child(1n) {
  background-color: #007fff;
  color: #fff;
}

.detail-body {
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  color: #666;
  padding: 22px;
  padding-bottom: 10px;
  min-height: 500px;
  padding-top: 40px;
}

.background {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 888;
  padding-top: 140px;
}

.img-wrapper {
  width: 80%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  padding: 0px 0px 30px 0px;
}

.img-wrapper img {
  width: 100%;
  transition: all 0.3s ease-in-out;
}

.close {
  position: fixed;
  right: 4%;
  top: 130px;
  width: 50px;
  opacity: 0.4;
  cursor: pointer;
}
</style>
