<!--
 * @Description: 选择会员页面
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-27 17:27:10
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-06 10:44:33
-->
<template>
  <div class="member-select">
    <NavBar current="user" />
    <div class="content">
      <h2>您的中级会员将于2010-08-02到期</h2>
      <div>初级会员年费: 1200</div>
      <div>中级会员年费: 1500</div>
      <div>高级会员年费: 1900</div>
      <div>终身会员年费: 12000</div>
      <el-radio v-model="type" label="update" border>升级会员</el-radio>
      <el-radio v-model="type" label="buy" border>购买会员</el-radio>
      <div v-if="type === 'update'" class="">
        <el-radio-group v-model="update">
          <el-radio :label="6">中级会员</el-radio>
          <el-radio :label="9">高级会员</el-radio>
          <el-radio :label="10">终身会员</el-radio>
        </el-radio-group>
      </div>
      <div v-else class="">
        <el-radio-group v-model="buy">
          <el-radio :label="3">初级会员</el-radio>
          <el-radio :label="6">中级会员</el-radio>
          <el-radio :label="9">高级会员</el-radio>
          <el-radio :label="10">终身会员</el-radio>
        </el-radio-group>
      </div>
      <el-radio-group v-model="payType">
        <el-radio :label="3">微信</el-radio>
        <el-radio :label="6">中级会员</el-radio>
        <el-radio :label="9">高级会员</el-radio>
        <el-radio :label="10">终身会员</el-radio>
      </el-radio-group>
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
      type: 'update', // 升级(update) | 购买(buy)
      update: null,
      buy: null,
      payType: null
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.member-select{
  .content{
    background: #ffffff;
  }
}
</style>