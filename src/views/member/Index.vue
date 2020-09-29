<template>
  <div class="wrap-index">
    <NavBar current="member" />
    <div class="content">
      <div v-if="!isMember" class="tip">
        <template v-if="userLevel > 1">
          您还不是会员,请及时缴费,成为会员方可使用
          <el-button type="primary" @click="$router.push('selectMember')">成为会员</el-button>
        </template>
        <template v-else>当前登录用户正在审核当中,请耐心等待审核</template>
      </div>
      <div v-else>
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
          label="资料类型"
          width="180"
          align="center">
          <template slot-scope="scope">
            {{scope.row.restype === 'PDF' ? 'pdf文件' : '视频'}}
          </template>
        </el-table-column>
        <el-table-column
          label="查看资料等级"
          width="180"
          align="center">
          <template slot-scope="scope">
            {{USER_LEVEL[scope.row.level]}}
          </template>
        </el-table-column>
        <el-table-column
          label="预览"
          align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.level > userLevel">
              <el-button @click="goMember" type="primary" size="small">升级会员</el-button>
            </template>
            <template v-else>
              <el-button v-if="scope.row.restype === 'PDF'" @click="preview(scope.row.id)" type="primary" size="small">预览</el-button>
              <el-button v-else @click="play(scope.row.id)" type="success" size="small">播放</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="下载"
          align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.level <= userLevel">
              <el-button @click="download(scope.row.id)" type="primary" size="small">下载</el-button>
            </template>
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
  </div>
</template>

<script>
import { getUser } from '@/utils/common'
import MaterialMethod from '@mixin/MaterialMethod'
import { USER_LEVEL } from '@/constants/status'

export default {
  mixins: [ MaterialMethod ],
  data() {
    return {
      USER_LEVEL,
      isMember: false, // 是否是会员
      userLevel: 1
    }
  },
  mounted() {
    this.type = this.$route.query.type
    if(getUser()){
      let user = getUser()
      this.userLevel = user.member.level
      if(user.member.id > 2) {
        this.isMember = true
        this.getList()
      }
    }
  },
  methods: {
    // 跳转升级会员页面
    goMember() {
      this.$router.push('selectMember')
    },
    getList() {
      this.loading = true
      this.$axios.get('resource.searchEq', {
        curPage: this.curPage,
        pageSize: this.pageSize,
        searchString: this.searchString,
        busitype: this.type,
        level: 6
      }).then((res) => {
        if (res.code === 0) {
          this.list = res.data.list
          this.total = res.data.total
        }
      }).finally(() => {
        this.loading = false
      })
    }
  },
  watch: {
    $route(value) {
      this.type = value.query.type
      this.getList()
    }
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