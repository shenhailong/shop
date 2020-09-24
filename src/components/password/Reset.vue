<!--
 * @Description: 重置密码
 * @Version: 1.0.0
 * @Autor: Dragon
 * @Date: 2020-08-03 15:56:12
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-24 13:52:05
-->
<template>
  <div class="login-card">
    <el-form @submit.native.prevent="submitHandler" ref="loginForm" :rules="rules" :model="form">
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
      <el-form-item prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword">
          <template slot="prepend" ><div style="width:40px">确认密码</div></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="footer">
          <el-button @click="$emit('back')" plain :style="{width:'100px'}" size="large">上一步</el-button>
          <el-button :loading="submitting" native-type="submit" :style="{width:'100px'}" type="primary" size="large">确认</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5'

export default {
  props: {
    username: {}
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.confirmPassword !== '') {
          this.$refs.ruleForm.validateField('confirmPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.passwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      submitting: false,
      form: {
        password: '',
        email: '',
        captcha: ''
      },
      // 校验规则
      rules: {
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z]{6,20}$/, message: '6 ~ 20位数字或者字母(区分大小写)', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'change' }
        ],
        email: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
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
            username: this.username,
            passwd: md5(this.ruleForm.passwd),
            captcha: this.form.captcha
          }
          this.$axios.post('user.validcode', data).then((res) => {
            if (res.data.code === 1) {
              this.$router.replace('/login')
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