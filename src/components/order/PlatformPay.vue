<!--
 * @Description: 待支付
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-09-04 09:43:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-29 09:08:00
-->
<template>
  <div class="wrap-index">
    <el-table
      :data="list"
      v-loading="loading"
      empty-text="无符合记录的数据"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <Child :list="props.row.ldetails || []" />
        </template>
      </el-table-column>
      <el-table-column
        prop="orderno"
        label="订单编号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createdt"
        label="下单时间"
        align="center">
        <template slot-scope="props">
          {{data(props.row.createdt)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="paystatus"
        label="订单状态"
        align="center">
        <template slot-scope="props">
          {{filterStatus(props.row.auditstatus)}}
        </template>
      </el-table-column>
      <el-table-column
        label="总价"
        align="center">
        <template slot-scope="props">
          合计: {{props.row.curprice}} 元
        </template>
      </el-table-column>
      <el-table-column
        prop="createdt"
        label="凭证"
        width="200"
        align="center">
        <template slot-scope="props">
          <img v-if="props.row.clurl" :src="props.row.clurl" height="100px" width="150px" />
        </template>
      </el-table-column>
      <el-table-column
        label="交付联系人"
        prop="contact"
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        label="联系电话"
        prop="tel"
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        label="交付邮箱"
        prop="email"
        width="140"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center">
        <template slot-scope="scope">
          <el-button @click="deleteOrder(scope.row)" type="danger" size="small">删除</el-button>
          <el-button v-if="!scope.row.email" @click="deliver(scope.row.id)" type="primary" size="small">交付信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="total">
      </el-pagination>
    </div>
    <DeliverInfo :visible.sync="deliverDialog" :orderId="orderId" @closeDeliver="closeDeliver" />
  </div>
</template>
<script>
import Child from './PlatformChild'
import { getDate } from '@/utils/tools'
import DeliverInfo from '@/components/order/DeliverInfo'
import { AUDIT_STATUS } from '@/constants/status'

export default {
  components: {
    Child,
    DeliverInfo
  },
  data() {
    return {
      ruleForm: {
        auditstatus: '2',
        curPage: 1, // 当前页
        pageSize: 10
      },
      list: [],
      total: 0,
      loading: false,
      deliverDialog: false,
      orderId: null
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    data(value) {
      return getDate(value)
    },
    filterStatus(value) {
      return AUDIT_STATUS[value]
    },
    // 总价
    totalPrice(children) {
      let price = 0
      children.forEach(item => {
        price += Number(item.totalprice)
      })
      return price
    },
    getList() {
      this.loading = true
      this.$axios.get('order.searchPay', this.ruleForm).then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
          this.total = res.data.total
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 页数切换
    currentChange(value) {
      this.ruleForm.curPage = value
      this.getList()
    },
    // 删除
    deleteOrder(row) {
      this.$confirm('确定删除该订单?', '删除订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async () => {
        const res = await this.$axios.post('order.remove', {
          id: row.id
        })
        if (res.code === 0) {
          this.getList()
        }else{
          this.reload()
        }
      }).catch(() => {})
    },
    deliver(id) {
      this.deliverDialog = true
      this.orderId = id
    },
    closeDeliver(reload = false) {
      this.deliverDialog = false
      if(reload){
        this.getList()
      }
    }
  }
}
</script>