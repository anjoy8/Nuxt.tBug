<template>
<div>
  <div desktop=12 tablet=8>
    <dl>
      <dt>Login successful</dt>
      <dt>Your browser should be redirected soon</dt>
    </dl>
  </div>
</div>
</template>

<script>
import applicationUserManager from '~/plugins/Auth/applicationusermanager'
import userAuth from '~/plugins/Auth/UserAuth'

export default {
  name: 'logincallback-view',
  mixins: [userAuth],
  data () {
    return {
    }
  },
  async created () {
    try {
     
        await applicationUserManager.signinRedirectCallback()
        let user = await applicationUserManager.getUser()
        console.log(user)
        
         this.$notify({
            title: '成功',
            message: "登录成功,Token有效期"+parseInt(user.expires_in/60)+"分钟",
            type: 'success'
        })

        window.localStorage.Token = user.access_token
        var curTime = new Date();
        var expiredate=  new Date(curTime.setSeconds(curTime.getSeconds() + user.expires_in));
        window.localStorage.TokenExptire = expiredate

        this.$store.commit("saveToken", user.access_token);
        
        this.$router.push({ path: '/' })
    } catch (e) {
      console.log(e)
      this.$root.$emit('show-snackbar', { message: e })
    }
  },

}
</script>

<style>

</style>


