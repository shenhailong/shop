<!--
 * @Description:
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-24 10:01:11
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-27 17:52:00
-->
<template>
  <div class="wrap-index">
    <NavBar current="order" />
    <div class="content">
      <Origin v-if="type === 'original'"/>
      <Platform v-if="type === 'platform'"/>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import Origin from '@components/order/Origin'
import Platform from '@components/order/Platform'

export default {
  components: {
    NavBar,
    Origin,
    Platform
  },
  data() {
    return {
      type: ''
    }
  },
  mounted() {
    this.type = this.$route.query.type
  },
  watch: {
    $route(value) {
      this.type = value.query.type
    }
  }
}
</script>

<style lang="scss" scoped>

</style>