<template>
  <div class="articleList">
    <el-row :gutter="20" style="padding-bottom:12px">
      <el-col :xs="24" :sm="24" :md="24" :lg="12"  v-for="item in articleList" :key="item.id" class="artitem" >
        <div @click="articlesDetailsFn(item.id)">
          <div class="box-card articles-box" >
            <div class="post-time">
              <span class="post-timecon">{{item.tdCreatetime}}</span>
            </div>
            <div class="post-title" >
              <h1>{{item.tdName}}</h1>
            </div>
            <div class="post-abstract">
              {{item.tdDetail}}
            </div>
          </div>
          <div class="artitem_bottom">
            <div class="poster"  >{{item.tdAuthor}} </div>
            <div class="post-label-box">
              <span class="post-label" >{{item.tdSectendDetail}}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {Loading} from 'element-ui';

  export default {
    name: 'ArticleList',
    props: {
      articleList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        defaultPoster: '',

      }
    },
    methods: {
      articlesDetailsFn: function(id){
        this.$router.push({ path: `/details/${id}`});
      }
    }
  }
</script>

<style>
  .poster {
    float: left;
    width: 90px;
    padding-top: 5px;
    padding-left: 5px;
    height: 30px;
    margin-top: 1px;
    /* border-radius: 50%; */
    overflow: hidden;
    box-shadow: 3px 2px 4px rgba(36, 61, 107, .2);
  }
  .poster img {
    width: 100%;
    position: relative;
    top: -12%;
  }
</style>
