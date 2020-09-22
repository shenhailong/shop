<!--
 * @Description: 原厂订单详情
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-27 16:08:54
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-22 13:52:32
-->
<template>
  <div class="wrap-index">
    <NavBar current="order" />
    <div class="content">
      <div class="title">
        订单详情
      </div>
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
            <div class="value">{{data(detail.orderdt)}}</div>
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
            <div class="label">公司英文名称: </div>
            <div class="value">{{detail.ecorpname}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="label">维保到期时间: </div>
            <div class="value">{{data(detail.enddt)}}</div>
          </div>
        </el-col>
      </el-row>

      <el-row class="row-line">
        <el-col :span="8">
          <div class="item">
            <div class="label">客户联系人: </div>
            <div class="value">{{detail.contact}}</div>
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
            <div class="label">邮箱: </div>
            <div class="value">{{detail.email}}</div>
          </div>
        </el-col>
      </el-row>

      <el-row class="row-line">
        <el-col :span="8">
          <div class="item">
            <div class="label">最终用户社会统一信用代码: </div>
            <div class="value">{{detail.shtyxydm}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import { getDate } from '@/utils/tools'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      detail: {
        orderno: '',
        custid: '',
        prodno: '',
        proddesc: '',
        amount: '',
        orderdt: '',
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
    data(value) {
      if(!value) return
      return getDate(value, true)
    },
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
  .title{
    font-size: 18px;
    color: $color-green;
    // border-left: 5px solid $color-green;
    border-bottom: 2px solid $color-green;
    padding: 0 15px 15px 0;
    margin-bottom: 20px;
    background: #ffffff;
  }
  .item{
    display: flex;
    align-items: center;
  }

  .label{
    font-size: 14px;
    color: #606266;
    margin-right: 10px;
    width: 90px;
  }

  .value{
    font-size: 18px;
    color: '#333';
    font-weight: 600;
    flex: 1;
    padding-right: 10px;
  }

  .row-line{
    height: 90px;
    // border-bottom: 1px solid #e0dbdb;
    display: flex;
    align-items: center;
  }
}
</style>