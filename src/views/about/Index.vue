<template>
  <div class="wrap-index">
    <NavBar current="" />
    <div class="content">
      <div class="title">磐安云创简介</div>
      <div class="description">
      <div>基本信息</div></div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'

export default {
  components: {
    NavBar
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.content{
  background: #ffffff;
  padding-left: 30px;
}
.title{
  font-size: 26px;
  text-align: center;
  padding: 30px 0;
}

.description{
  padding: 30px;
}
</style>