<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-11 15:52:11
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-11 18:28:27
-->
<template>
  <div class="wx-pay">
    <div class="content">
      <div class="title">
        支付
      </div>
      <el-steps :active="1" simple>
        <el-step title="确认订单" icon="el-icon-edit"></el-step>
        <el-step title="支付"></el-step>
        <el-step title="支付成功"></el-step>
      </el-steps>
      <div class="qr-wrap">
        
      </div>
    </div>
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

  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/utils/theme.scss';
.content{
  padding-top: 20px;
}

.title{
  font-size: 18px;
  color: $color-green;
  border-left: 5px solid $color-green;
  padding: 15px;
  margin-bottom: 20px;
  background: #ffffff;
}
</style>