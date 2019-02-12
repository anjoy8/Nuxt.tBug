<template>
  <div class="container">
    <div v-if="error.statusCode === 404" class="page">
      <nuxt-link to="/">
        <img src="http://123.206.33.109:7090/images/02121053331525013647902.jpg" alt="个人技术博客vue、netcore、ddd">
      </nuxt-link>
    </div>
    <div v-else class="page">
      <nuxt-link to="/">
        <img src="http://123.206.33.109:7090/images/02121053331525013647902.jpg" alt="个人技术博客vue、netcore、ddd">
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blog'
  }
</script>

<style scoped>
  .page img{width: 80%;padding-top: 60px; display: block; margin:0 auto}
</style>
