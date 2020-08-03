<!--
 * @Description: 忘记密码
 * @Version: 1.0.0
 * @Autor: Dragon
 * @Date: 2020-08-03 15:56:12
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-03 16:20:57
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
          <el-button :loading="submitting" native-type="submit" :style="{width:'100px'}" type="primary" size="large">确认</el-button>
          <el-button @click="$router.back()" :style="{width:'100px'}" size="large">返回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import axios from 'axios'
export default {
  data() {
    return {
      submitting: false,
      form: {
        userName: '',
        email: '',
        captcha: ''
      },
      // 校验规则
      rules: {
        userName: [
          { required: true, message: '账号不能为空哦', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
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
            password: this.form.password
            // captcha: this.form.captcha
          }
          axios.post('/api/adm/account/login', data).then((res) => {
            if (res.data.code === 1) {
              // const loginInfo = res.data.data
              // const TOKEN_KEY = process.env.TOKEN_KEY
              // window.localStorage.setItem(TOKEN_KEY, loginInfo.accessToken.accessToken)
              window.location = `index.html?_=${new Date().getTime()}/#/dashboard`
            } else if (res.data.code === '2') {
              Notification({
                type: 'error',
                title: '错误',
                message: res.data.message
              })
              this.needCaptcha = true
              this.rules.captcha[0].required = true
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