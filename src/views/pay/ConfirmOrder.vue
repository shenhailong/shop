<!--
 * @Description: 确认
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-07 13:36:27
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-08 15:16:55
-->
<template>
  <div class="pay-confirm">
    <div class="content">
      <div class="title">
        订单详情
      </div>
      <el-steps :active="1" simple>
        <el-step title="订单详情" icon="el-icon-edit"></el-step>
        <el-step title="支付"></el-step>
        <el-step title="支付成功"></el-step>
      </el-steps>

      <div class="table-wrap">
        <el-table
          :data="list"
          size="mini"
          border
          row-class-name="success-row"
          style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="pprodname"
            label="产品名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="prodname"
            label="产品明细"
            align="center">
          </el-table-column>
          <el-table-column
            prop="unit"
            label="时间单位"
            align="center">
            <template slot-scope="props">
              <div v-if="props.row.unit === 'Y'">年</div>
              <div v-if="props.row.unit === 'M'">月</div>
              <div v-if="props.row.unit === 'D'">日</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="tamount"
            label="购买时长"
            align="center">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="购买数量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="totalprice"
            label="价格"
            align="center">
          </el-table-column>
        </el-table>
      </div>

      <!-- <div class="title">请选择支付方式</div>
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
      </div> -->

      <div class="footer">
        <div class="footer-content">
          <div class="left">
            <div class="footer-item">
              下单时间: {{date()}}
            </div>
          </div>
          <div class="right">
            <div class="footer-item">
              合计:  <span class="money">{{detail.curprice}}</span> 元
            </div>
            <div v-if="showDiscount" class="footer-item">
              <el-checkbox v-model="discount" @change="useDiscount">使用{{rate}}折优惠</el-checkbox>
            </div>
            <div class="footer-item btn-wrap">
              <el-button @click="getPayType()" type="primary" size="large">获取支付方式</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDate } from '@/utils/tools'

export default {
  components: {

  },
  data() {
    return {
      payType: 'wx',
      list: [],
      detail: {},
      showDiscount: false, // 是否显示折扣
      discount: false, // 是否使用折扣
      rate: 100
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    date() {
      if(this.detail.createdt){
        return getDate(this.detail.createdt)
      }
    },
    getDetail() {
      this.loading = true
      this.$axios.get('order.detail', {
        id: this.$route.params.id
      }).then((res) => {
        if (res.code === 0) {
          this.list = res.data.ldetails
          this.detail = res.data
          this.discount = res.data.discountType === '2'
          this.getDiscount()
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 是否可以使用折扣
    async getDiscount() {
      const res = await this.$axios.post('order.zhekou', 
        { orderid: this.$route.params.id })
      if (res.code === 0 && res.data) {
        this.calculateTotal()
        this.showDiscount = true
        this.rate = (parseFloat(res.data) * 100)
      }else{
        this.showDiscount = false
      }
    },
    pay() {
      let data = {}
      this.$axios.post('order.topay', data).then((res) => {
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
    },
    calculateTotal() {

    },
    // 使用折扣
    async useDiscount(value) {
      let discount = value ? 2 : 1
      const res = await this.$axios.post('order.discount', 
        { orderid: this.$route.params.id, discount })
      if (res.code === 0) {
        this.getDetail()
      }else{
        // this.reload()
      }
    },
    getPayType() {
      window.open('http://39.100.227.252:888/cnas/order/topay.jsp')
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
  padding: 20px 0;
  z-index: 100;
  .money{
    font-size: 24px;
    color: $color-primary;
  }
  .footer-content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1170px;
    margin: 0 auto;
    border: 1px solid #EBEEF5;
  }
  .footer-item{
    padding: 20px;
    height: 100%;
    font-size: 16px;
  }

  .left{
    .footer-item{
      border-right: 1px solid #EBEEF5;
    }
  }

  .right{
    .footer-item{
      border-left: 1px solid #EBEEF5;
    }
  }

  .left, .right{
    display: flex;
    align-items: center;
  }
}
</style>
