<template>
  <div class="wrap-login">
    <div class="login-card">
      <el-card>
        <div class="login-view-box form-con">
          <el-form @submit.native.prevent="submitHandler" ref="loginForm" :rules="rules" :model="form">
              <el-form-item prop="originPassword">
                <el-input type="password" v-model="form.originPassword">
                  <template slot="prepend"><div style="width:40px">原密码</div></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="form.password">
                  <template slot="prepend" ><div style="width:40px">密&nbsp;&nbsp;码</div></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input type="password" v-model="form.confirmPassword">
                  <template slot="prepend" ><div style="width:40px">确认密码</div></template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <div class="footer">
                  <el-button :loading="submitting" native-type="submit" :style="{width:'100px'}" type="primary" size="large">确认</el-button>
                </div>
              </el-form-item>
            </el-form>
        </div>
      </el-card>
    </div>
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
        originPassword: '',
        password: '',
        confirmPassword: ''
      },
      // 校验规则
      rules: {
        originPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '必须新密码一致', trigger: 'blur' }
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
            originPassword: this.form.originPassword,
            password: this.form.password
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
            }
          }).finally(() => {
            this.submitting = false
          })
        }
      })
    },
    back() {
      this.$router.push('user')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  box-sizing: border-box;
  .login-card{
    width: 340px;
   .header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
  }
  .logo{
    width: 203px;
    height: 30px;
    margin-bottom: 22px;
    img{
      width: 203px;
      height: 30px;
    }
  }

  .login-view-box{
    .title{
      font-size: 16px;
      color: #333333;
      font-weight: normal;
      margin-bottom: 22px;
      text-align: left;
    }
    .text{
      font-size: 12px;
      color: #333333;
      margin-top: 10px;
      text-align: center;
    }
    &.form-con{
      .el-input__icon{
        color: #ffffff;
      }
      .text{
        margin-top: -6px;
      }
    }
    &.qr{
       text-align: center;
       img{
         border: 1px solid #ffffff;
         padding: 10px;
       }
    }
  }
  .login-tip {
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
  }
  .el-input-group__append,
  .el-input-group__prepend{
    background: #cccccc;
    padding: 0 10px;
  }
  .ion-person,
  .ion-locked{
    color: #ffffff;
    font-size: 22px;
  }

  .footer{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>