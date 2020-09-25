<template>
  <div class="">
    <el-row :gutter="20" justify="end">
      <el-form :model="ruleForm" size="mini" ref="ruleForm" label-width="80px">
        <el-col :span="6">
          <el-form-item label="查询条件" prop="searchString">
            <el-input v-model="ruleForm.searchString" placeholder="请输入订单编号 / 产品编号"></el-input>
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
      v-loading="loading"
      border
      style="width: 100%">
      <el-table-column
        prop="orderno"
        label="订单号码"
        width="150"
        align="center">
        <template slot-scope="scope">
          <div class="link" @click="goDetail(scope.row.id)" type="primary">{{ scope.row.orderno }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="custid"
        label="客户订阅号"
        width="150"
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
        <template slot-scope="props">
          {{data(props.row.orderdt)}}
        </template>
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
import { getDate } from '@/utils/tools'
import { getUser } from '@/utils/common'

export default {
  data() {
    return {
      ruleForm: {
        searchString: '',
        sstartdate: '',
        senddate: '',
        curPage: 1, // 当前页
        pageSize: 12,
      },
      list: [],
      date: [],
      total: 0,
      loading: false,
      canSearch: false
    }
  },
  mounted() {
    if(getUser()){
      let user = getUser()
      if(user.corp.level > 2) {
        this.getList()
        this.canSearch = true
      }else{
        this.canSearch = false
      }
    }
  },
  methods: {
    data(value) {
      return getDate(value)
    },
    getList() {
      this.loading = true
      this.$axios.get('originorder.searchpage', this.ruleForm).then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 查询
    search() {
      if(this.canSearch){
        this.getList()
      }else{
        this.$message.error('该功能仅对会员开放查询')
      }
    },
    // 页数切换
    currentChange(value) {
      this.curPage = value
      this.getList()
    },
    resetForm(formName) {
      this.date = []
      this.ruleForm.sstartdate = ''
      this.ruleForm.senddate = ''
      this.$refs[formName].resetFields();
    },
    dateChange(value) {
      this.ruleForm.sstartdate = value ? value[0] : ''
      this.ruleForm.senddate = value ? value[1] : ''
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