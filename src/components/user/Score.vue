<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-05 17:56:27
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-22 13:54:52
-->
<template>
  <div class="content-score">
    <div class="title">您的当前积分: <span class="text">{{score}}</span></div>
    <el-table
      :data="tableData"
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
      </el-table-column>
      <el-table-column
        label="积分明细"
        align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column
        label="增减情况"
        align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableData: [{
        date: '2020-8-20',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2020-8-20',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2020-8-20',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2020-8-20',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      score: 10
    }
  },
  mounted() {

  },
  methods: {
    uploadVoucher(){}
  }
}
</script>

<style lang="scss" scoped>

.content-score{
  width: 90%;
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