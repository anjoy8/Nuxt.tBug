<template>
  <div id="app">
    <el-row :gutter="0">
      <el-col class="nav">
        <el-col class="nav-bar" :sx="22" :sm="22" :md="22" :lg="16">
          <div class="nav-bar-body">
            <div class="nav-bar-inner">
              <div id="logo" @click="homepage">
                <img id="bigpng"
                     src="../assets/logoa.png"/>
                <img id="smallpng"
                     src="../assets/authlogo.png"/>
              </div>
            </div>
            <div>
               <a href="http://vueadmin.neters.club" target="_blank" class="adminlogo" id="avatar">
                <img src="http://vueadmin.neters.club/favicon.ico" alt="">
              </a>
              <div id="search">
                <el-input style="width: auto;" placeholder="搜索" :on-icon-click="searchArticle" v-model="search"
                          @keyup.enter.native="keyupsearch($event)">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>

                <el-button @click="loginpage"  class="mobile-tibug" type="primary"  icon="el-icon-edit" circle></el-button>

              </div>
            </div>
          </div>
          <div class="navmenu">
            <template>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="item in taglists" :key=item :label='item+"专题"' :name="item"
                             data-ripple></el-tab-pane>
              </el-tabs>
              <!-- <el-button type="primary" icon="el-icon-edit" id="addacticlebtn" @click="loginpage">Ti Bug</el-button> -->
            </template>
          </div>
        </el-col>
      </el-col>
      <el-col :xs="24" :sm="22" :md="22" :lg="16" class="container_article">
        <div class="main">
          <nuxt/>
        </div>
      </el-col>
    </el-row>
    <div class="footer">京ICP备xxxxxxxx号</div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'app',
    data() {
      return {
        taglists: ['全部'],
        search: '',
        activeName: ''
      }
    },
    mounted() {
      var _hmt = _hmt || []
      //baidu

      this.taglist()
      var winwinth = window.innerWidth
      if (this.$route.params.tag === undefined && this.$route.fullPath === '/') {
        this.activeName = '全部'
      } else {
        this.activeName = this.$route.params.tag
      }
    },
    methods: {
      taglist() {
        axios.get('/api/Topic').then(
          respone => {
            const tagList = (respone.data.response || []).map(item => item.tName)
            this.taglists = ['全部', ...tagList]
          })
      },
      keyupsearch(ev) {
        if (ev.keyCode === 13) {
          this.searchArticle()
        }
      },
      handleClick(tab) {
        const { index } = tab
        this.$router.push({ path: `/${index == 0 ? '' : tab.name}` })
      },
      searchArticle() {
        const trimSearch = this.search.trim()
        if (!trimSearch) {
          return this.$notify.info({
            title: '提示',
            message: '您还未输入搜索内容',
            offset: 100
          })
        }
        this.$router.push({ path: `/search/${this.search}` })
      },
      loginpage() {

        this.$router.push({ path: `/tibug/0` })
      },
      homepage() {

        this.$router.push({ path: `/` })
      }
    }
  }
</script>

<style>
  .el-message-box{
    max-width: 100% !important;
  }
</style>
