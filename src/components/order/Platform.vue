<!--
 * @Description:
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-09-04 09:31:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-29 09:19:11
-->
<template>
  <div class="wrap-index">
    <el-row :gutter="20" justify="end">
      <div class="tab">
        <div @click="status = 4" :class="{ active : status == 4}" class="item">待支付</div>
        <div @click="status = 1" :class="{ active : status == 1}" class="item">待审核</div>
        <div @click="status = 2" :class="{ active : status == 2}" class="item">已支付</div>
        <div @click="status = 3" :class="{ active : status == 3}" class="item"> 审核拒绝</div>
      </div>
    </el-row>
    <PlatformNoPay :status="status" />
    <!-- <PlatformPay v-else/> -->
  </div>
</template>
<script>
import PlatformNoPay from './PlatformNoPay'
// import PlatformPay from './PlatformPay'

export default {
  components: {
    PlatformNoPay,
    // PlatformPay
  },
  data() {
    return {
      status: 4 // 状态
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/utils/theme.scss';

.tab{
  margin-bottom: 20px;
  display: flex;

  .item{
    width: 100px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    padding: 10px;
    background: $color-gray;
    border-radius: 50px;
    margin-right: 5px;
    &.active{
      background: $color-primary;
      color: #ffffff;
    }
  }
}
</style>