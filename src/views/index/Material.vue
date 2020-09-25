<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-29 09:40:44
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-24 15:40:06
-->
<template>
  <div class="wrap-index">
    <NavBar current="" />
    <div class="content">
      <div class="search-wrap">
        <el-input class="serach-input" v-model="searchString" placeholder="请输入资料名称" clearable></el-input>
        <el-button type="primary" :disabled="loading" @click="getList">搜索</el-button>
      </div>
      <el-table
        :data="list"
        v-loading="loading"
        stripe
        style="width: 100%">
        <el-table-column
          prop="resname"
          label="资料名称"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="resname"
          label="资料类型"
          width="180"
          align="center">
          <template slot-scope="scope">
            {{scope.row.restype === 'PDF' ? 'pdf文件' : '视频'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="resname"
          label="资料所属"
          width="180"
          align="center">
          <template slot-scope="scope">
            {{scope.row.level > 2 ? '会员资料' : '公共资料'}}
          </template>
        </el-table-column>
        <el-table-column
          label="预览"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.restype === 'PDF'" @click="preview(scope.row.id, scope.row.level)" type="primary" size="small">预览</el-button>
            <el-button v-else @click="play(scope.row.id, scope.row.level)" type="success" size="small">播放</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="下载"
          align="center">
          <template slot-scope="scope">
            <el-button @click="download(scope.row.id, scope.row.level)" type="primary" size="small">下载</el-button>
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
    <el-dialog top="50px" height="50%" title="视频" :visible.sync="player">
      <VideoPlayer :sources="resurl" v-if="player" :poster="poster" />
    </el-dialog>
    <el-dialog
      title="欢迎登录"
      :visible.sync="loginDialogVisible"
      width="30%"
      center>
      <Login />
    </el-dialog>
  </div>
</template>

<script>
import MaterialMethod from '@mixin/MaterialMethod'
import Login from '@/components/Login'

export default {
  components: {
    Login
  },
  mixins: [ MaterialMethod ],
  data() {
    return {
      loginDialogVisible: false
    }
  },
  mounted() {
    this.searchString = this.$route.query.keyword
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$axios.get('resource.homesearch', {
        curPage: this.curPage,
        pageSize: this.pageSize,
        searchString: this.searchString
      }).then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
          this.total = res.data.total
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

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