<template>
  <div >
    <el-form ref="form" :model="form" label-width="80px" style="padding-top: 20px;">
      <el-form-item label="简要描述">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="作者昵称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="是否解决">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>

      <el-form-item label="专题分类">
        <el-select v-model="form.region" placeholder="请选择专题分类">
          <el-option label=".NetCore专题" value=".NetCore专题"></el-option>
          <el-option label="VUE专题" value="VUE专题"></el-option>
          <el-option label="DDD专题" value="DDD专题"></el-option>
          <el-option label="SqlSugar专题" value="SqlSugar专题"></el-option>
          <el-option label="Nuxt专题" value="Nuxt专题"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="正文内容">
        <no-ssr><mavon-editor :toolbars="markdownOption" v-model="form.content"  ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" /></no-ssr>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  import axios from '~/plugins/axios'

  export default {
    data() {
      return {
        markdownOption: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          navigation: true, // 导航目录
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
        form: {
          title: '',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: true,
          type: [],
          resource: '',
          content: '',
          desc: ''
        },
        handbook: "#### 这是手册",
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      if (window.loading) {
        window.loading.close();
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form);
      },
      // 绑定@imgAdd event
      $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('image', $file);
        axios({
          url: '/api/Img/Pic',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((url) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          $vm.$img2Url(pos, url);
        })
      },
      $imgDel(file) {
        this.markdownIt.image_del(file[0]);
        // 删除所有markdown中的图片
        let fileReg = file[1]
        let reg = new RegExp(`\\!\\[${file[0]._name}\\]\\(${fileReg}\\)`, "g")
        this.d_value = this.d_value.replace(reg, '');
        this.iRender();
        this.$emit('imgDel', file);
      },
    }

  }
</script>
