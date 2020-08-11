<!--
 * @Description: 确认
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-07 13:36:27
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-11 18:33:42
-->
<template>
  <div class="pay-confirm">
    <div class="content">
      <div class="title">
        确认订单
      </div>
      <el-steps :active="1" simple>
        <el-step title="确认订单" icon="el-icon-edit"></el-step>
        <el-step title="支付"></el-step>
        <el-step title="支付成功"></el-step>
      </el-steps>

      <div class="table-wrap">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="商品名称"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="购物"
            >
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额">
          </el-table-column>
        </el-table>
      </div>

      <div class="title">请选择支付方式</div>
      <div class="tab">
        <div @click="payType = 'wx'" :class="{ active : payType == 'wx'}" class="item">
          <div class="wx-logo"></div>
          微信支付
        </div>
        <div @click="payType = 'ali'" :class="{ active : payType == 'ali'}" class="item">
          <div class="ali-logo"></div>
          支付宝
        </div>
        <div @click="payType = 'card'" :class="{ active : payType == 'card'}" class="item">
          <div class="card-logo"></div>
          银行卡
        </div>
      </div>

      <div class="footer">
        <div class="footer-content">
          <el-button @click="pay" type="primary">立即支付</el-button>
        </div>
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
      tableData: [{
        name: '升级会员',
        a: '王小虎',
        money: '2000元'
      }],
      payType: 'wx'
    }
  },
  mounted() {

  },
  methods: {
    pay() {
      let data = {}
      this.$axios.post('user.register', data).then((res) => {
        if (res.data.code === 0) {
          if(this.payType === 'wx'){
            this.$router.push('wxPay')
          } else if(this.payType === 'ali') {
            window.open('https://www.baidu.com/')
          } else {
            window.open('https://www.baidu.com/')
          }
        }
      }).finally(() => {
        this.submitting = false
      })
    }
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

  .table-wrap{
    margin-bottom: 10px;
  }

  .tab{
    margin-bottom: 20px;
    display: flex;
    background: #ffffff;
    padding: 30px 20px;
    .item{
      width: 100px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      padding: 0 20px 5px 20px;
      border: 1px solid $color-gray;
      border-radius: 10px;
      margin-right: 50px;
      box-shadow: 0 6px 12px 0 rgba(0,0,0,.15);
      &.active{
        border: 2px solid $color-primary;
        color: $color-primary;
      }
    }
  }

  .wx-logo{
    height: 64px;
    width: 64px;
    background: url(~@/assets/wx.png) no-repeat;
    background-size: contain;
    cursor: pointer;
    margin: 0 auto;
  }

  .ali-logo{
    height: 56px;
    width: 56px;
    background: url(~@/assets/ali.png) no-repeat;
    background-size: contain;
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 8px;
  }

  .card-logo{
    height: 64px;
    width: 64px;
    background: url(~@/assets/card.png) no-repeat;
    background-size: contain;
    cursor: pointer;
    margin: 0 auto;
  }

  .footer{
    width: 100%;
    background: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    .footer-content{
      display: flex;
      padding: 20px;

      align-items: center;
      justify-content: flex-end;
      width: 1170px;
      margin: 0 auto;
      border: 1px solid $color-gray;
    }
  }
</style>
