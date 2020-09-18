<!--
 * @Description: 忘记密码wrap
 * @Version: 1.0.0
 * @Autor: Dragon
 * @Date: 2020-08-03 15:25:04
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-18 18:03:24
-->
<template>
  <div class="wrap-login">
    <el-card class="step">
      <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
      <el-step title=忘记密码 ></el-step>
      <el-step title="重置密码" ></el-step>
    </el-steps>
    <Forget v-if="active === 0" />
    <Reset v-if="active === 1" />
    </el-card>
  </div>
</template>

<script>
import Forget from '@/components/password/Forget'
import Reset from '@/components/password/Reset'
export default {
  components: {
    Forget,
    Reset
  },
  data() {
    return {
      active: 0
    }
  },
  created() {
    console.log(this.$route.query.step)
    
    if(this.$route.query.step === 'reset'){
      this.active = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-login {
  width: 100%;
  height: 100%;
  background: url(~@/assets/login-bg1.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 150px;
  box-sizing: border-box;

  .step{
    width: 700px;
    height: 450px;
  }
  .login-card{
    width: 340px;
    margin: 0 auto;
  }
}
</style>