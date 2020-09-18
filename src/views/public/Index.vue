<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-29 09:40:44
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-18 16:35:41
-->
<template>
  <div class="wrap-index">
    <NavBar current="public" />
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
          label="预览"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.restype === 'PDF'" @click="preview(scope.row.id)" type="primary" size="small">预览</el-button>
            <el-button v-else @click="play(scope.row.id)" type="success" size="small">播放</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="下载"
          align="center">
          <template slot-scope="scope">
            <el-button @click="download(scope.row.id)" type="primary" size="small">下载</el-button>
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
  </div>
</template>

<script>
import MaterialMethod from '@mixin/MaterialMethod'
export default {
  mixins: [ MaterialMethod ],
  data() {
    return {}
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$axios.get('resource.searchEq', {
        curPage: this.curPage,
        pageSize: this.pageSize,
        searchString: this.searchString,
        level: 2
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