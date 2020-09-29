<!--
 * @Description: 积分页面
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-05 17:56:27
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-29 14:26:43
-->
<template>
  <div class="content-score">
    <div class="title">您的当前积分: <span class="text">{{score}}</span></div>
    <el-table
      :data="list"
      stripe
      border
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        width="40">
      </el-table-column>
      <el-table-column
        prop="date"
        label="时间"
        width="180"
        align="center">
        <template slot-scope="scope">
          {{date(scope.row.createdt)}}
        </template>
      </el-table-column>
      <el-table-column
        label="增减情况"
        align="center">
        <template slot-scope="scope">
          {{scope.row.amount}}
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        align="center">
        <template slot-scope="scope">
          {{scope.row.typName}}
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
import { getDate } from '@/utils/tools'
import { getUser } from '@/utils/common'

export default {
  data() {
    return {
      ruleForm: {
        curPage: 1, // 当前页
        pageSize: 10
      },
      list: [],
      score: 0,
      total: 0
    }
  },
  mounted() {
    this.getList()
    if(getUser()){
      let user = getUser()
      this.score = user.corp.jfye
    }
  },
  methods: {
    date(value) {
      return getDate(value)
    },
    getList() {
      this.loading = true
      this.$axios.post('user.searchJf', this.ruleForm).then((res) => {
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
    }
  }
}
</script>

<style lang="scss" scoped>

.content-score{
  width: 90%;
  min-height: 400px;
  margin: 0 auto;
  padding-top: 50px;
}

.title{
  font-size: 16px;
  margin-bottom: 20px;
  .text{
    color: $color-primary;
    font-size: 20px;
  }
}
</style>