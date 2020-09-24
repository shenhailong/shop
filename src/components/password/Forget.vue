<!--
 * @Description: 忘记密码
 * @Version: 1.0.0
 * @Autor: Dragon
 * @Date: 2020-08-03 15:56:12
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-24 13:41:55
-->
<template>
  <div class="login-card">
    <el-form @submit.native.prevent="submitHandler" ref="loginForm" :rules="rules" :model="form">
      <el-form-item prop="userName">
        <el-input v-model="form.userName">
          <template slot="prepend"><div style="width:40px">用户名</div></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="text" v-model="form.email">
          <template slot="prepend" ><div style="width:40px">邮&nbsp;&nbsp;箱</div></template>
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
        userName: '',
        email: '819062373@qq.com'
      },
      // 校验规则
      rules: {
        userName: [
          { required: true, message: '账号不能为空哦', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '请输入正确的邮箱', trigger: 'blur' },
        ]
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
          let data = {
            username: this.form.userName,
            email: this.form.email
          }
          this.$axios.post('user.validcode', data).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 5000
              });
              this.$emit('next', this.form.userName)
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