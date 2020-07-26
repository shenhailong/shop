<template>
  <div class="wrap-login">
    <div class="login-card">
      <el-card>
        <h3 slot="header">
          <i class="ion-log-in"></i>
            欢迎注册
        </h3>
        <div class="login-view-box form-con">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请填写用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="公司全称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="社会统一信用代码" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            v 
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
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
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
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
    },
    goRegister() {
      this.$router.push('register')
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
    width: 540px;
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
}
</style>