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
              <el-form-item prop="username">
                <el-input @blur="inputBlur"  v-model.trim="form.username" maxlength="20">
                  <template slot="prepend"><div style="width:40px">用户名</div></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="form.password" maxlength="20">
                  <template slot="prepend" ><div style="width:40px">密&nbsp;&nbsp;码</div></template>
                </el-input>
              </el-form-item>
              <el-form-item v-if="needCaptcha" prop="vcode">
                <div style="clear:both;">
                  <el-input type="text" v-model="form.vcode" maxlength="4" style="float:left;width:185px;margin-right:10px;">
                    <template slot="prepend"><div style="width:40px">验证码</div></template>
                  </el-input>
                  <div style="display:inline-block;">
                    <img @click="getImg" :src="codeUrl"
                      width="100" height="40" alt="captcha" style="float:left;">
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="footer">
                  <el-button @click="goRegister" :style="{width:'100px'}" size="large">注册</el-button>
                  <el-button :loading="submitting" :disabled="submitting" native-type="submit" :style="{width:'100px'}" type="primary" size="large">登录</el-button>
                </div>
                <div @click="$router.push('forgetPassword')" class="forget">忘记密码?</div>
              </el-form-item>
            </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import { TOKEN, USER_INFO } from '@/constants/key'
import { BASE_URL } from '@/constants/common'

export default {
  data() {
    return {
      submitting: false,
      form: {
        username: '',
        password: '',
        vcode: ''
      },
      // 是否需要验证码
      needCaptcha: false,
      // 验证码路径
      imgUrl: `${BASE_URL}/cnas/v1/vcode.picture.generate`,
      // 随机数
      random: '',
      codeUrl: '',
      // 校验规则
      rules: {
        username: [
          { required: true, message: '用户名不能为空哦', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        vcode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
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
          this.submitting = true
          let data = {
            username: this.form.username,
            passwd: md5(this.form.password),
            vcode: this.form.vcode
          }
          this.$axios.post('user.login', data).then((res) => {
            if (res.code === 0) {
              window.localStorage.setItem(TOKEN, res.data.token)
              window.localStorage.setItem(USER_INFO, JSON.stringify(res.data))
              this.$notify({
                type: 'success',
                title: '登录成功',
                duration: 1000
              })
              setTimeout(() => {
                this.$router.replace('index')
                this.submitting = false
              }, 500)
            } else {
              this.submitting = false
            }
          })
        }
      })
    },
    //  用户名输入框输入就重新获取验证码
    inputBlur() {
      if(this.form.username) {
        this.needCaptcha = true
        this.getImg()
      }
    },
    getImg() {
      this.codeUrl = `${this.imgUrl}?username=${this.form.username}&random=${Math.random()}`
    },
    goRegister() {
      this.$router.push('register')
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
  overflow: scroll;
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

  .footer{
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #999999;
    padding-top: 20px;
  }

  .forget{
    color: #F56C6C;
    cursor: pointer;
    text-align: center;
    line-height: 16px;
    width: 100px;
    margin: 0 auto;
    margin-top: 20px;
  }
}
</style>