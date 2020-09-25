<!--
 * @Description: 忘记密码
 * @Version: 1.0.0
 * @Autor: Dragon
 * @Date: 2020-08-03 15:56:12
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-25 13:41:24
-->
<template>
  <div class="login-card">
    <el-form @submit.native.prevent="submitHandler" ref="loginForm" :rules="rules" :model="form">
      <el-form-item prop="username">
        <el-input v-model="form.username">
          <template slot="prepend"><div style="width:40px">用户名</div></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="footer">
          <el-button @click="$router.back()" :style="{width:'100px'}" size="large">返回</el-button>
          <el-button :loading="submitting" native-type="submit" :style="{width:'100px'}" type="primary" size="large">下一步</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      submitting: false,
      form: {
        username: ''
      },
      // 校验规则
      rules: {
        username: [{ required: true, message: '用户名不能为空哦', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitHandler() {
      if (this.submitting === true) {
        return false
      }
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.submitting = true
          this.$axios.post('user.validcode',  this.form).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 5000
              });
              this.$emit('next', this.form.username)
            }
          }).finally(() => {
            this.submitting = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-card{
    padding-top: 50px;
  }
  .footer{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 20px;
  }
</style>