<template>
  <div class="wrap-index">
    <NavBar current="order" />
    <div class="content">
      <div v-if="!isMember" class="tip">
        您还不是会员,请及时缴费,成为会员方可使用
        <el-button type="primary" @click="$router.push('payIndex')">成为会员</el-button>
      </div>
      <div v-else>
        
      </div>
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
      isMember: true // 是否是会员
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.tip{
  color: #333333;
  font-size: 20px;
  text-align: center;
  padding-top: 100px;
}
</style>