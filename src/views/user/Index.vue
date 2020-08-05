<!--
 * @Description: 用户中心
 * @Version: 1.0.0
 * @Autor: Dragon
 * @Date: 2020-07-27 13:22:49
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-05 18:23:25
-->
<template>
  <div class="wrap-index">
    <NavBar current="user" />
    <div class="content">
      <el-tabs type="card" :value="current" tab-position="right">
        <el-tab-pane label="用户信息"><Info @changeTab="changeTab" /></el-tab-pane>
        <el-tab-pane label="修改密码"><ChangePassword /></el-tab-pane>
        <el-tab-pane label="维护信息"><MaintainInfo /></el-tab-pane>
        <el-tab-pane label="修改核心资料"><ChangeMaterial /></el-tab-pane>
        <el-tab-pane label="积分详情"><Score /></el-tab-pane>
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
import Score from '@components/user/Score'

export default {
  components: {
    NavBar,
    Info,
    ChangePassword,
    MaintainInfo,
    ChangeMaterial,
    Score
  },
  data() {
    return {
      current: '0'
    }
  },
  mounted() {

  },
  methods: {
    changeTab(value) {
      this.current = value
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  background: #ffffff;
  min-height: 500px;
}
</style>
