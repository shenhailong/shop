<template>
  <div class="wrap-login">
    <el-card class="login-card">
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
    </el-card>
  </div>
</template>
<script>
import md5 from 'md5'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.confirmPassword !== '') {
          this.$refs.resetForm.validateField('confirmPassword');
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
        originPassword: '',
        password: '',
        confirmPassword: ''
      },
      // 校验规则
      rules: {
        originPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z]{6,20}$/, message: '6 ~ 20位数字或者字母(区分大小写)', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'change' }
        ],
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
            originPassword: md5(this.form.originPassword),
            password: md5(this.form.password)
          }
          this.submitting = true
          this.$axios.post('user.validcode', data).then((res) => {
            if (res.code === 0) {
              this.$message.success('密码修改成功')
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
.wrap-login {
  display: flex;
  justify-content: center;
  padding-top: 50px;
  box-sizing: border-box;
  .login-card{
    width: 340px;
  }

  .footer{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>