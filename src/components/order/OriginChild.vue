<template>
  <div>
    <el-table
      :data="list"
      size="mini"
      border
      row-class-name="success-row"
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="unit"
        label="时间单位"
        align="center">
        <template slot-scope="props">
          <div v-if="props.row.unit === 'Y'">年</div>
          <div v-if="props.row.unit === 'M'">月</div>
          <div v-if="props.row.unit === 'D'">日</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="tamount"
        label="购买时长"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="购买数量"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    list: {}
  }
}
</script>

<style lang="scss">
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
