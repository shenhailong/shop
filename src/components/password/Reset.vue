<!--
 * @Description: 重置密码
 * @Version: 1.0.0
 * @Autor: Dragon
 * @Date: 2020-08-03 15:56:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-28 16:20:13
-->
<template>
  <div class="login-card">
    <el-form @submit.native.prevent="submitHandler" ref="resetForm" :rules="rules" :model="ruleForm">
      <el-form-item prop="passwd">
        <el-input type="password" v-model="ruleForm.passwd">
          <template slot="prepend" ><div style="width:40px">密&nbsp;&nbsp;码</div></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input type="password" v-model="ruleForm.confirmPassword">
          <template slot="prepend" ><div style="width:40px">确认密码</div></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="validcode">
        <el-input type="text" v-model="ruleForm.validcode">
          <template slot="prepend" ><div style="width:40px">验证码</div></template>
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
      ruleForm: {
        password: '',
        confirmPassword: '',
        validcode: ''
      },
      // 校验规则
      rules: {
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^.*[^\s]{6,20}$/, message: '6 ~ 20位非空格字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'change' }
        ],
        validcode: [
          { required: true, message: '验证码不能为空, 请查看注册邮箱获取验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitHandler() {
      if (this.submitting === true) {
        return false
      }
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          let data = {
            username: this.username,
            newPasswd: md5(this.ruleForm.passwd),
            validcode: this.ruleForm.validcode
          }
          this.submitting = true
          this.$axios.post('user.resetPasswd', data).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '重置成功,请重新登录',
                type: 'success',
                duration: 2000
              });
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