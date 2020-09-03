<template>
  <div class="wrap-index">
    <el-row :gutter="20" justify="end">
      <el-form :model="ruleForm" ref="ruleForm" label-width="80px">
        <el-col :span="6">
          <el-form-item label="订单号码" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支付状态">
            <el-select v-model="ruleForm.region" placeholder="请选择支付状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
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
        prop="id"
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
          {{props.row.paystatus === 'Y' ? '已支付' : '未支付'}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button @click="uploadVoucher(scope.row)" type="primary" size="small">支付</el-button>
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
import Child from './OriginChild'
import { getDate } from '@/utils/tools'
export default {
  components: {
    Child
  },
  data() {
    return {
      ruleForm: {
        // code: '',
        // name: '',
        keyword: '',
        curPage: 2, // 当前页
        pageSize: 2
      },
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
    getList() {
      this.loading = true
      this.$axios.get('order.pagelist', this.ruleForm).then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 页数切换
    currentChange(value) {
      this.curPage = value
      this.getList()
    },
    // 查询
    search() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    uploadVoucher(){}
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
  margin-left: 30px;
}
</style>