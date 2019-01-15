<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" style="padding-top: 20px;">
      <el-form-item label="问题标题">
        <el-input v-model="form.tdName"></el-input>
      </el-form-item>
      <el-form-item label="简要描述">
        <el-input v-model="form.tdDetail"></el-input>
      </el-form-item>
      <el-form-item label="作者昵称">
        <el-input v-model="form.tdAuthor"></el-input>
      </el-form-item>
      <el-form-item label="作者头像">
        <!--<el-input v-model="form.tdLogo"></el-input>-->
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3089/api/Img/Pic"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.tdLogo" :src="form.tdLogo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="是否解决">
        <el-switch v-model="form.isok"></el-switch>
      </el-form-item>

      <el-form-item label="专题分类">
        <el-select v-model="form.TopicId" placeholder="请选择专题分类">
          <el-option v-for="item in taglists" :key=item.id :label='item.tName+"专题"' :value="item.id"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="正文内容">
        <no-ssr>
          <mavon-editor :toolbars="markdownOption" v-model="form.tdContent" ref=md @imgAdd="$imgAdd"/>
        </no-ssr>
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
          preview: true // 预览
        },
        form: {
          tdName: '',
          tdDetail: '',
          tdAuthor: '',
          tdLogo: '',
          isok: true,
          tdContent: '',
          TopicId: '',
          tdSectendDetail: 'tbug',
          Id: 0
        },
        taglists: [],
        handbook: '#### 这是手册',
        imageUrl: ''
      }
    },
    mounted(params) {

      let tdid = this.$route.params.id
      debugger
      if(tdid>0){
        this.form.Id=tdid;
        this.taglist(tdid)
      }
      window.addEventListener('scroll', this.handleScroll)
      if (window.loading) {
        window.loading.close()
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {

        this.form.tdLogo = 'http://localhost:3089/' + res.response
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt1M
      },
      taglist(id) {
        let that = this
        axios.get('/api/Topic').then(
          respone => {
            const tagList = (respone.data.data || [])
            that.taglists = tagList

          })
        if (id > 0) {
          axios.get('/api/TopicDetail/' + id).then(
            respone => {

              const tagList = (respone.data.response || [])

              that.form = tagList
              that.form.TopicId = tagList.topicId
              that.form.isok = true
            })
        }

      },
      onSubmit() {
        console.log(this.form)
        let that = this
        let formdata = this.form

        if (!formdata.tdName) {
          this.$message({
            message: '请输入简要描述',
            type: 'warning'
          })
          return
        }
        if (!formdata.tdAuthor) {
          this.$message({
            message: '请输入你的昵称',
            type: 'warning'
          })
          return
        }
        if (!formdata.isok) {
          this.$message({
            message: '暂时还不能添加未解决的Bug哟',
            type: 'warning'
          })
          return
        }
        if (!(formdata.TopicId > 0)) {
          this.$message({
            message: '请选择专题分类',
            type: 'warning'
          })
          return
        }
        if (!formdata.tdContent) {
          this.$message({
            message: '请填写正文内容',
            type: 'warning'
          })
          return
        }
debugger
        if(formdata.id>0){

          axios({
            url: '/api/TopicDetail/update',
            method: 'put',
            data: formdata
          }).then((response) => {
            debugger
            if (response.data.success) {
              that.$notify({
                title: '成功',
                message: response.data.msg,
                type: 'success'
              })

              this.$router.push({ path: `/details/${response.data.response}` })


            } else {
              that.$notify.error({
                title: '错误',
                message: response.data.msg
              })
            }
          })
        }
        else {
          axios({
            url: '/api/TopicDetail',
            method: 'post',
            data: formdata
          }).then((response) => {
            debugger
            if (response.data.success) {
              that.$notify({
                title: '成功',
                message: response.data.msg,
                type: 'success'
              })

              this.$router.push({ path: `/details/${response.data.response}` })


            } else {
              that.$notify.error({
                title: '错误',
                message: response.data.msg
              })
            }
          })

        }



      },
      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        let that = this
        // 第一步.将图片上传到服务器.
        var formdata = new FormData()
        formdata.append('image', $file)
        axios({
          url: '/api/Img/Pic',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((url) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          debugger
          that.$refs.md.$img2Url(pos, 'http://localhost:3089/' + url.data.response)
        })
      },
      $imgDel(file) {
        this.markdownIt.image_del(file[0])
        // 删除所有markdown中的图片
        let fileReg = file[1]
        let reg = new RegExp(`\\!\\[${file[0]._name}\\]\\(${fileReg}\\)`, 'g')
        this.d_value = this.d_value.replace(reg, '')
        this.iRender()
        this.$emit('imgDel', file)
      }
    }

  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
