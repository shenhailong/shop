<template>
  <div class="wrap-index">
    <NavBar current="member" />
    <div class="content">
      <div v-if="!isMember" class="tip">
        您还不是会员,请及时缴费,成为会员方可使用
        <el-button type="primary" @click="$router.push('selectMember')">成为会员</el-button>
      </div>
      <div v-else>
        <div class="search-wrap">
          <el-input class="serach-input" v-model="keyword" placeholder="请输入资料名称" clearable></el-input>
          <el-button type="primary" :disabled="loading" @click="getList">搜索</el-button>
        </div>
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
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="currentChange"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import { getUser } from '@/utils/common'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      isMember: false, // 是否是会员
      list: [],
      keyword: '',
      curPage: 1, // 当前页
      pageSize: 12,
      total: 0,
      loading: false
    }
  },
  mounted() {
    if(getUser()){
      let user = getUser()
      if(user.corp.mid > -2) {
        this.isMember = true
        this.getList()
      }
    }
  },
  methods: {
    // 查询
    search() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    uploadVoucher(){},
    currentChange(value) {
      this.curPage = value
      this.getList()
    },
    getList() {
      this.loading = true
      this.$axios.get('custprod.list', {
        curPage: this.curPage,
        pageSize: this.pageSize,
        keyword: this.keyword
      }).then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
          this.total = res.data.total
        }
      }).finally(() => {
        this.loading = false
      })
    },
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

.search-wrap{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
  .serach-input{
    width: 300px;
    margin-right: 20px;
  }
}

.pagination{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>