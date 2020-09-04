<!--
 * @Description:
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-09-04 09:31:02
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-04 10:41:49
-->
<template>
  <div class="wrap-index">
    <el-row :gutter="20" justify="end">
      <div class="tab">
        <div @click="type = 'nopay'" :class="{ active : type == 'nopay'}" class="item">待支付</div>
        <div @click="type = 'pay'" :class="{ active : type == 'pay'}" class="item">已支付</div>
      </div>
    </el-row>
    <PlatformNoPay v-if="type === 'nopay'"/>
    <PlatformPay v-else/>
  </div>
</template>
<script>
import PlatformNoPay from './PlatformNoPay'
import PlatformPay from './PlatformPay'

export default {
  components: {
    PlatformNoPay,
    PlatformPay
  },
  data() {
    return {
      type: 'nopay' // 待支付、已支付
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