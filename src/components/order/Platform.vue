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
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="订单编号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品名称"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mode"
        label="时间单位"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="length"
        label="购买时长"
        align="center">
      </el-table-column>
      <el-table-column
        prop="num"
        label="购买数量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="date"
        label="下单时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="订单状态"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button @click="uploadVoucher(scope.row)" type="primary" size="small">上传支付凭证</el-button>
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

export default {
  data() {
    return {
      ruleForm: {
        // code: '',
        // name: '',
        keyword: '',
        curPage: 2, // 当前页
        pageSize: 2
      },
      list: [{
        date: '2016-05-02',
        name: '产品1',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '产品1',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '产品1',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '产品1',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
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