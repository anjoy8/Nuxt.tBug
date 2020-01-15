<template>
  <div>
    <el-form ref="form" :model="response" label-width="80px" style="padding-top: 20px;">
      <el-form-item label="问题标题">
        <el-input v-model="response.tdName"></el-input>
      </el-form-item>
      <el-form-item label="简要描述">
        <el-input v-model="response.tdDetail"></el-input>
      </el-form-item>
      <el-form-item label="作者昵称">
        <el-input v-model="response.tdAuthor"></el-input>
      </el-form-item>
      <el-form-item label="作者头像">
        <!--<el-input v-model="response.tdLogo"></el-input>-->
        <el-upload
          class="avatar-uploader"
          action="/images/Upload/Pic"
          :show-file-list="false"
          :headers="token"
          :data="ruleForm"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="response.tdLogo" :src="response.tdLogo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="是否解决">
        <el-switch v-model="response.isok"></el-switch>
      </el-form-item>

      <el-form-item label="专题分类">
        <el-select v-model="response.TopicId" placeholder="请选择专题分类">
          <el-option
            v-for="item in taglists"
            :key="item.id"
            :label="item.tName+'专题'"
            :value="item.Id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="正文内容">
        <no-ssr>
          <mavon-editor
            :toolbars="markdownOption"
            v-model="response.tdContent"
            ref="md"
            @imgAdd="$imgAdd"
          />
        </no-ssr>
      </el-form-item>
      <el-form-item>
        <el-button v-if="submitAble" type="primary" @click="onSubmit">{{submitName}}</el-button>
        <el-button v-else type="primary" @click="toLogin">{{submitName}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
import applicationUserManager from '~/plugins/Auth/applicationusermanager'
import userAuth from '~/plugins/Auth/UserAuth'

export default {
  async asyncData({ params, error, redirect }) {
    try {
      const { id } = params

      const {
        data: { response }
      } = await axios.get('/api/TopicDetail/get/' + id)
      if (!(id > 0)) {
        response.tdName = ''
        response.tdContent = ''
        response.tdDetail = ''
        response.tdAuthor = ''
        response.tdLogo = ''
        response.isok = false
        response.TopicId = '0'
        response.tdSectendDetail = ''
      }

      response.isok = true
      return { response }
    } catch (err) {
      if (err.response && err.response.status == 401) {
        //这里使用Id4授权认证，用Jwt，请删之；
        applicationUserManager.login()
        // return redirect('/login')
      } else {
        error({ statusCode: 404 })
      }
    }
  },
  mixins: [userAuth],
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
      submitName: '',
      submitAble: true,
      imageUrl: '',
      token: {
        Authorization: 'Bearer '
      },
      //！！！点击提交按钮，除file文件外，可以携带其它参数
      ruleForm: {
        max_ver: '',
        min_ver: '',
        enable: ''
      }
    }
  },
  mounted(params) {
    let tokenStr = window.localStorage.Token
    this.token = {
      Authorization: 'Bearer ' + tokenStr
    }
    let tdid = this.$route.params.id

    this.form.Id = tdid > 0 ? tdid : 0
    this.submitName = tdid > 0 ? '点击更新' : '立即创建'
    var curTime = new Date()
    var expiretime = new Date(Date.parse(window.localStorage.TokenExptire))

    if (tdid > 0) {
      if (
        curTime >= expiretime ||
        !window.localStorage.Token ||
        !window.localStorage.TokenExptire
      ) {
        this.submitAble = false
        this.submitName = '去登录'
        this.$confirm('未登录或者令牌失效, 是否重新登录?', '无权限！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            //这里使用Id4授权认证，用Jwt，请删之；
            applicationUserManager.login()
            // this.$router.push({ path: `/login?redirect=/tibug/${tdid}` })
          })
          .catch(() => {})
      }
    }
    this.taglist(tdid)
    window.addEventListener('scroll', this.handleScroll)
    if (window.loading) {
      window.loading.close()
    }
  },
  methods: {
    toLogin() {
      //这里使用Id4授权认证，用Jwt，请删之；
      applicationUserManager.login()
      // this.$router.push({ path: `/login?redirect=/tibug/${this.$route.params.id}` })
    },
    handleAvatarSuccess(res, file) {
      this.response.tdLogo = '/' + res.response
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

      axios.get('/api/Topic').then(respone => {
        const tagList = respone.data.response || []
        that.taglists = tagList
        console.log(that.taglists)
      })
      if (id > 0) {
        // axios.get('/api/TopicDetail/get/' + id).then(
        //   respone => {
        //
        //     const tagList = (respone.data.response || [])
        //
        //     that.form = tagList
        //     that.form.TopicId = tagList.TopicId
        //     that.form.isok = true
        //   })
      }
    },
    onSubmit() {
      let that = this
      // let formdata = this.form
      let formdata = this.response

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
      window.loading = this.$loading({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })
      if (formdata.Id > 0) {
        try {
          axios({
            url: '/api/TopicDetail/update',
            method: 'put',
            data: formdata
          }).then(response => {
            if (response.data.success) {
              that.$notify({
                title: '成功',
                message: response.data.msg,
                type: 'success'
              })

              this.$router.push({ path: `/details/${response.data.response}` })
            } else {
              if (response.data.status == 401 || response.data.status == 403) {
                that
                  .$confirm('未登录或者令牌失效, 是否重新登录?', '无权限！', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  })
                  .then(() => {
                    //这里使用Id4授权认证，用Jwt，请删之；
                    applicationUserManager.login()
                    // this.$router.push({ path: `/login?redirect=/tibug/${formdata.id}` })
                  })
                  .catch(() => {})

                if (window.loading) {
                  window.loading.close()
                }

                return
              }
            }
          })
        } catch (err) {}
      } else {
        formdata.tdSectendDetail = 'tbug'

        axios({
          url: '/api/TopicDetail/post',
          method: 'post',
          data: formdata
        }).then(response => {
          if (window.loading) {
            window.loading.close()
          }
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
      formData.append('testid', 1)

      axios({
        url: '/images/Upload/Pic',
        method: 'post',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + window.localStorage.Token
        }
      }).then(url => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */

        that.$refs.md.$img2Url(pos, '/' + url.data.response)
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
  border-color: #409eff;
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

.markdown-body {
  height: 500px !important;
}
</style>
