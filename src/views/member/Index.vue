<template>
  <div class="wrap-index">
    <NavBar current="member" />
    <div class="content">
      <div v-if="!isMember" class="tip">
        您还不是会员,请及时缴费,成为会员方可使用
        <el-button type="primary" @click="$router.push('selectMember')">成为会员</el-button>
      </div>
      <div v-else>
        <el-table
          :data="list"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="资料名称"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="date"
            label="资料简介"
            align="center">
            <template slot-scope="scope">
              <el-button @click="uploadVoucher(scope.row)" type="primary" size="small">查看资料简介</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button @click="uploadVoucher(scope.row)" type="primary" size="small">预览</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button @click="uploadVoucher(scope.row)" type="primary" size="small">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      isMember: false, // 是否是会员
      ruleForm: {
        code: '',
        name: ''
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
      }]
    }
  },
  mounted() {

  },
  methods: {
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