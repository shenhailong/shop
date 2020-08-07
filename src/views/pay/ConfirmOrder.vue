<!--
 * @Description: 确认
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-07 13:36:27
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-07 15:09:34
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
            prop="date"
            label="商品名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>

      <div>
        <div class="title">请选择支付方式</div>
        <el-radio-group v-model="payType">
          <el-radio :label="3">微信支付
            <div class="wx-logo"></div>
          </el-radio>
          <el-radio :label="4">支付宝
            <div class="ali-logo"></div>
          </el-radio>
          <el-radio :label="5">银行卡
            <div class="card-logo"></div>
          </el-radio>
        </el-radio-group>
      </div>
      <div class="footer">
        <div class="footer-content">
        <el-button type="primary">去支付</el-button>
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
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      payType: null
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

  .pay-confirm{
  }

  .title{
    font-size: 20px;
    color: $color-green;
    border-left: 5px solid $color-green;
    padding: 10px;
    margin: 20px 0;
  }

  .table-wrap{
    margin-top: 20px;
  }

  .wx-logo{
    height: 64px;
    width: 64px;
    background: url(~@/assets/wx.png) no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  .ali-logo{
    height: 56px;
    width: 56px;
    background: url(~@/assets/ali.png) no-repeat;
    background-size: contain;
    cursor: pointer;
  }

  .card-logo{
    height: 64px;
    width: 64px;
    background: url(~@/assets/card.png) no-repeat;
    background-size: contain;
    cursor: pointer;
  }

  .footer{
    width: 100%;
    background: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 20px 0;
    .footer-content{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 1170px;
      margin: 0 auto;
      border: 1px solid #EBEEF5;
    }
  }
</style>
