<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-27 16:08:54
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-27 18:25:52
-->
<template>
  <div class="wrap-index">
    <NavBar current="order" />
    <div class="content">
      <el-row class="row-line">
        <el-col :span="8">
          <span class="label">订单号码: </span>{{detail.orderno}}
        </el-col>
        <el-col :span="8">
          <span class="label">客户订阅号: </span>{{detail.custid}}
        </el-col>
        <el-col :span="8">
          <span class="label">产品编号: </span>{{detail.prodno}}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <span class="label">产品描述: </span>{{detail.proddesc}}
        </el-col>
        <el-col :span="8">
          <span class="label">产品数量: </span>{{detail.amount}}
        </el-col>
        <el-col :span="8">
          <span class="label">订单时间: </span>{{detail.orderdt}}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <span class="label">订单号码: </span>{{detail.orderno}}
        </el-col>
        <el-col :span="8">
          <span class="label">客户订阅号: </span>{{detail.custid}}
        </el-col>
        <el-col :span="8">
          <span class="label">产品编号: </span>{{detail.prodno}}
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <span class="label">订单号码: </span>{{detail.orderno}}
        </el-col>
        <el-col :span="8">
          <span class="label">客户订阅号: </span>{{detail.custid}}
        </el-col>
        <el-col :span="8">
          <span class="label">产品编号: </span>{{detail.prodno}}
        </el-col>
      </el-row>
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
      detail: {
        orderno: 'O-00108823',
        custid: 'A-S100108823',
        prodno: 'T9584AAE',
        proddesc: 'LoadRunner Professional Foundation Entitlement Software E-LTU',
        amount: '100',
        orderdt: '2020/7/9',
        enddt: '',
        ccorpname: '',
        ecorpname: '',
        contact: '',
        tel: '',
        email: '',
        shtyxydm: ''
      }
    }
  },
  mounted() {
    console.log(this.$route.params.id)
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.loading = true
      this.$axios.get('originorder.check').then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
        }
      }).finally(() => {
        this.loading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.content{
  background: #fff;
  color: #606266;
  font-size: 16px;
  padding: 150px 30px;
  box-sizing: border-box;
  .label{
    font-size: 14px;
    color: #606266;
  }

  .row-line{
    margin-bottom: 20px;
  }
}
</style>