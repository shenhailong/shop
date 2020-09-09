<template>
  <div class="wrap-index">
    <el-row :gutter="20" justify="end">
      <el-form size="mini" :model="ruleForm" ref="ruleForm" label-width="80px">
        <el-col :span="6">
          <el-form-item label="订单号码" prop="orderno">
            <el-input v-model="ruleForm.orderno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单时间">
            <el-date-picker
              @change="dateChange"
              v-model="date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          &nbsp;<div style="width:10px;height:10px"></div>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <div class="btn-wrap">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="resetForm('ruleForm')" class="reset">重置</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-table
      :data="list"
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
        <template>
          待支付
        </template>
      </el-table-column>
      <el-table-column
        label="总价"
        align="center">
        <template slot-scope="props">
          合计: {{totalPrice(props.row.ldetails)}} 元
        </template>
      </el-table-column>
      <el-table-column
        prop="createdt"
        label="凭证"
        align="center">
        <template slot-scope="props">
          {{data(props.row.createdt)}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button @click="deleteOrder(scope.row)" type="danger" size="small">删除</el-button>
          <el-button @click="pay(scope.row)" type="primary" size="small">支付</el-button>
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
  </div>
</template>
<script>
import Child from './PlatformChild'
import { getDate } from '@/utils/tools'
export default {
  components: {
    Child
  },
  data() {
    return {
      ruleForm: {
        paystatus: 'N',
        orderno: '',
        sstartdate: '',
        senddate: '',
        curPage: 1, // 当前页
        pageSize: 10
      },
      date: [],
      list: [],
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    data(value) {
      return getDate(value)
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
      this.$axios.get('order.search', this.ruleForm).then((res) => {
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
    dateChange(value) {
      this.ruleForm.sstartdate = value ? value[0] : ''
      this.ruleForm.senddate = value ? value[1] : ''
    },
    // 查询
    search() {
      this.getList()
    },
    resetForm(formName) {
      this.date = []
      this.ruleForm.sstartdate = ''
      this.ruleForm.senddate = ''
      this.$refs[formName].resetFields();
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
    pay(row){
      this.$router.push(`confirmOrder/${row.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.tip{
  color: #333333;
  font-size: 20px;
  text-align: center;
  padding-top: 100px;
}

.btn-wrap{
  display: flex;
  justify-content: flex-end;
}

.reset{
  margin-left: 20px;
}
</style>