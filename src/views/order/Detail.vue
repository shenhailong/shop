<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-27 16:08:54
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-09 17:05:45
-->
<template>
  <div class="wrap-index">
    <NavBar current="order" />
    <div class="content">
      <el-row class="row-line">
        <el-col :span="8">
          <div class="item">
            <div class="label">订单号码: </div>
            <div class="value">{{detail.orderno}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="label">客户订阅号: </div>
            <div class="value">{{detail.custid}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="label">产品编号: </div>
            <div class="value">{{detail.prodno}}</div>
          </div>
        </el-col>
      </el-row>

      <el-row class="row-line">
        <el-col :span="8">
          <div class="item">
            <div class="label">产品描述: </div>
            <div class="value">{{detail.proddesc}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="label">产品数量: </div>
            <div class="value">{{detail.amount}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="label">订单时间: </div>
            <div class="value">{{detail.orderdt}}</div>
          </div>
        </el-col>
      </el-row>

      <el-row class="row-line">
        <el-col :span="8">
          <div class="item">
            <div class="label">公司中文名称: </div>
            <div class="value">{{detail.ccorpname}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="label">联系电话: </div>
            <div class="value">{{detail.tel}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="label">客户订阅号: </div>
            <div class="value">{{detail.custid}}</div>
          </div>
        </el-col>
      </el-row>

      <el-row class="row-line">
        <el-col :span="8">
          <div class="item">
            <div class="label">客户订阅号: </div>
            <div class="value">{{detail.custid}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="label">客户订阅号: </div>
            <div class="value">{{detail.custid}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="label">客户订阅号: </div>
            <div class="value">{{detail.custid}}</div>
          </div>
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
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.loading = true
      this.$axios.get('originorder.detail', { id: this.$route.params.id }).then((res) => {
        if (res.code === 0) {
          this.detail = res.data
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

  .item{
    display: flex;
    align-items: center;
  }

  .label{
    font-size: 14px;
    color: #606266;
    margin-right: 10px;
  }

  .value{
    font-size: 20px;
    color: '#333';
    font-weight: 600;
  }

  .row-line{
    margin-bottom: 20px;
  }
}
</style>