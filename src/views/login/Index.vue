<template>
  <div class="wrap-login">
    <div class="login-card">
      <el-card>
        <h3 slot="header">
          <i class="ion-log-in"></i>
            欢迎登录
        </h3>
        <div class="login-view-box form-con">
          <el-form @submit.native.prevent="submitHandler" ref="loginForm" :rules="rules" :model="form">
              <el-form-item prop="userName">
                <el-input v-model="form.userName">
                  <template slot="prepend"><div style="width:40px">用户名</div></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="form.password">
                  <template slot="prepend" ><div style="width:40px">密&nbsp;&nbsp;码</div></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="captcha">
                <div style="clear:both;">
                  <el-input type="text" v-model="form.captcha" style="float:left;width:185px;margin-right:10px;">
                    <template slot="prepend"><div style="width:40px">验证码</div></template>
                  </el-input>
                  <div style="display:inline-block;">
                    <img @click="changeCaptcha" :src="captchaUrl"
                      width="100" height="40" alt="captcha" style="float:left;">
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button :loading="submitting" native-type="submit" type="primary" size="large" :style="{width: '100%'}">登录</el-button>
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
        userName: '',
        password: '',
        captcha: ''
      },
      // 是否需要验证码
      needCaptcha: false,
      // 验证码路径
      imgUrl: '/images/kaptcha.jpg',
      // 随机数
      random: '',
      // 校验规则
      rules: {
        userName: [
          { required: true, message: '账号不能为空哦', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        captcha: [
          { required: false, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      activeName: 'first'
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
    },
    // 修改随机数
    changeCaptcha() {
      this.random = Math.random()
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  computed: {
    // 拼接验证码图片地址
    captchaUrl() {
      return `${this.imgUrl}?${this.random}`
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-login {
  width: 100%;
  height: 100%;
  background: url(~@/assets/login-bg.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 150px;
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

  .el-card__body{
    min-height: 330px;
    padding: 20px 20px 20px 20px;
    // border: 1px solid $--border-color-base;
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
}
.login-tab{
  // display: flex;
  // > .el-tabs__header{
  //   display: flex;
  //   width: 100%;
  // }
  // > .el-tabs__nav-wrap{
  //   width: 100%;
  // }
  .el-tabs__nav{
    width: 100%;
    display: flex;
  }
  .el-tabs__item{
    flex: 1;
    text-align: center;
  }
}

</style>