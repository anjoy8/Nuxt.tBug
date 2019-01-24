<template>
  <div style="padding-top: 20px;">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
        </el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'tibug',
          checkPass: 'tibug'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      }
    },
    mounted() {
      if (window.loading) {
        window.loading.close()
      }
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields()
      },
      handleSubmit2(ev) {
        var _this = this
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true
            //NProgress.start();
            var loginParams = { name: this.ruleForm2.account, pass: this.ruleForm2.checkPass }
            let redirect = _this.$route.query.redirect

            axios({
              url: `/api/login/JWTToken3.0?name=${_this.ruleForm2.account}&pass=${_this.ruleForm2.checkPass}`,
              method: 'get',
              data: loginParams
            }).then((response) => {

              if (response.data.success) {
                _this.$notify({
                  title: '成功',
                  message: "登录成功,Token有效期"+(response.data.expires_in/60)+"分钟",
                  type: 'success'
                })

                window.localStorage.Token = response.data.token
                var curTime = new Date();
                var expiredate=  new Date(curTime.setSeconds(curTime.getSeconds() + response.data.expires_in));
                window.localStorage.TokenExptire = expiredate


                _this.$router.push({ path: redirect ? redirect:'/' })

              } else {
                _this.logining=false;
                _this.$notify.error({
                  title: '错误',
                  message: response.data.message
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 10px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>
