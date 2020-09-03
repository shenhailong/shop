<template>
  <div class="">
    <el-row :gutter="20" justify="end">
      <el-form :model="ruleForm" size="mini" ref="ruleForm" label-width="80px">
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
          <el-form-item label="产品编号" prop="id">
            <el-input v-model="ruleForm.id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
        <el-col :span="12">
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
        prop="orderno"
        label="订单号码"
        width="150"
        align="center">
        <template slot-scope="scope">
          <el-link @click="goDetail(scope.row.orderno)" type="primary">{{ scope.row.orderno }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="custid"
        label="客户订阅号"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mode"
        label="产品名称"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="prodno"
        label="产品编号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="proddesc"
        label="产品描述"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="数量"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="orderdt"
        label="订单时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ccorpname"
        label="公司中文名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="联系电话"
        align="center">
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
        code: '',
        name: '',
        id: '',
        start: '',
        end: '',
        curPage: 1, // 当前页
        pageSize: 12,
      },
      list: [{
        orderno: 'O-00108823',
        custid: 'A-S100108823',
        prodno: 'T9584AAE',
        proddesc: 'LoadRunner Professional Foundation Entitlement Software E-LTU',
        amount: '100',
        orderdt: '2020/7/9',
        ccorpname: '中国电子科技网络信息安全有限公司',
        tel: '010-58278923'
      }],
      date: [],
      curPage: 1, // 当前页
      pageSize: 12,
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
      this.$axios.get('originorder.search', this.ruleForm).then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 查询
    search() {
      this.getList()
    },
    // 页数切换
    currentChange(value) {
      this.curPage = value
      this.getList()
    },
    resetForm(formName) {
      this.date = []
      this.$refs[formName].resetFields();
    },
    dateChange(value) {
      this.ruleForm.start = value ? value[0] : ''
      this.ruleForm.end = value ? value[1] : ''
    },
    goDetail(value) {
      this.$router.push({
        path: `order/${value}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-wrap{
  display: flex;
  justify-content: flex-end;
}

.reset{
  margin-left: 30px;
}

.pagination{
  display: flex;
  justify-content: flex-end;
}
</style>