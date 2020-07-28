<template>
  <div class="wrap-index">
    <NavBar current="public" />
    <div class="content">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="资料名称"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          label="预览"
          align="center">
          <template slot-scope="scope">
            <el-button @click="uploadVoucher(scope.row)" type="primary" size="small">预览</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="下载"
          align="center">
          <template slot-scope="scope">
            <el-button @click="uploadVoucher(scope.row)" type="primary" size="small">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      tableData: [{
        date: '文件资料名称',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '文件资料名称',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '文件资料名称',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '文件资料名称',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted() {

  },
  methods: {
    uploadVoucher(){}
  }
}
</script>
