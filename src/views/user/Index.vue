<template>
  <div class="wrap-index">
    <NavBar current="user" />
    <div class="content">
      <el-tabs type="card" tab-position="right">
        <el-tab-pane label="用户信息"><Info /></el-tab-pane>
        <el-tab-pane label="修改密码"><ChangePassword /></el-tab-pane>
        <el-tab-pane label="维护信息"><MaintainInfo /></el-tab-pane>
        <el-tab-pane label="修改核心资料"><ChangeMaterial /></el-tab-pane>
        <el-tab-pane label="注销用户">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import Info from '@components/user/Info'
import ChangePassword from '@components/user/ChangePassword'
import MaintainInfo from '@components/user/MaintainInfo'
import ChangeMaterial from '@components/user/MaintainInfo'

export default {
  components: {
    NavBar,
    Info,
    ChangePassword,
    MaintainInfo,
    ChangeMaterial
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
