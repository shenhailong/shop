<template>
  <div class="wrap-login">
    <el-form></el-form>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    submit() {
      localStorage.setItem('key','value')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-login{
  background: url(~@/assets/login-bg.jpg);
  background-size: cover;
  height: 100%;
  width: 100%;
}
</style>