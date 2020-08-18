<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-29 09:40:44
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-18 14:27:03
-->
<template>
  <div class="wrap-index">
    <NavBar current="public" />
    <div class="content">
      <div class="search-wrap">
        <el-input class="serach-input" v-model="keyword" placeholder="请输入资料名称" clearable></el-input>
        <el-button type="primary" :disabled="loading" @click="getList">搜索</el-button>
      </div>
      <el-table
        :data="list"
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
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="视频" :visible.sync="palyer">
      <VideoPlayer :sources="sources" v-if="palyer" />
    </el-dialog>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import VideoPlayer from '@components/VideoPlayer'
export default {
  components: {
    NavBar,
    VideoPlayer
  },
  data() {
    return {
      list: [],
      keyword: '',
      curPage: 1, // 当前页
      pageSize: 12,
      total: 0,
      loading: false,
      sources: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      palyer: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    uploadVoucher(){
      this.palyer = true
    },
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