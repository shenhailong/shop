<!--
 * @Description: 确认
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-07 13:36:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-29 09:59:07
-->
<template>
  <div class="pay-confirm">
    <NavBar current="user" />
    <div class="content">
      <div class="title">
        购买会员详情
      </div>
      <el-steps :active="1" simple>
        <el-step title="会员详情" icon="el-icon-edit"></el-step>
        <el-step title="支付"></el-step>
        <el-step title="支付成功"></el-step>
      </el-steps>
      <div class="table-wrap">
        <el-table
          :data="list"
          border
          empty-text="无符合记录的数据"
          row-class-name="success-row"
          style="width: 100%">
          <el-table-column
            label="购买的会员等级"
            align="center">
            <template slot-scope="scope">
              {{USER_LEVEL[scope.row.mid]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="createdt"
            label="开始日期"
            align="center">
            <template slot-scope="scope">
              {{date(scope.row.hyksrq)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="createdt"
            label="结束日期"
            align="center">
            <template slot-scope="scope">
              {{date(scope.row.hyjsrq)}}
            </template>
          </el-table-column>
          <el-table-column
            label="金额"
            prop="curprice"
            align="center">
            <template slot-scope="scope">
              {{scope.row.paynum}} 元
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="footer">
        <div class="footer-content">
          <div class="left">
          </div>
          <div class="right">
            <div class="footer-item">
              合计:  <span class="money">{{detail.paynum}}</span> 元
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
import { USER_LEVEL } from '@/constants/status'
import { BASE_URL } from '@/constants/common'
import NavBar from '@components/NavBar'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      USER_LEVEL,
      list: [],
      detail: {},
      rate: 100
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    date(value) {
      return getDate(value, true)
    },
    getDetail() {
      this.loading = true
      this.$axios.post('memberpay.detail', {
        id: this.$route.params.id
      }).then((res) => {
        if (res.code === 0) {
          this.detail = res.data
          this.$set(this.list, 0, this.detail)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    getPayType() {
      window.open(`${BASE_URL}/cnas/order/topay.jsp`)
    }
  }
}
</script>
<style lang="scss" scoped>
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
