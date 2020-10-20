<template>
  <el-dialog
    title="请填写交付信息"
    :visible.sync="visible"
    width="30%"
    :close-on-click-modal="false"
    :show-close="false"
    center>
    <div class="wrap-login">
      <div class="login-view-box form-con">
        <el-form @submit.native.prevent="submitHandler" ref="ruleForm" :rules="rules" :model="form">
          <el-form-item prop="contact">
            <el-input v-model.trim="form.contact" maxlength="20">
              <template slot="prepend"><div style="width:40px">联系人</div></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="tel">
            <el-input v-model.trim="form.tel" maxlength="11">
              <template slot="prepend"><div style="width:40px">联系电话</div></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="form.email" maxlength="50">
              <template slot="prepend" ><div style="width:40px">邮&nbsp;&nbsp;箱</div></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="footer">
              <el-button :loading="submitting" :disabled="submitting" @click="close(false)" :style="{width:'100px'}" size="large">取消</el-button>
              <el-button :loading="submitting" :disabled="submitting" native-type="submit" :style="{width:'100px'}" type="primary" size="large">提交</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { emailReg, telReg } from '@/utils/regular'

export default {
  props: [ 'visible', 'orderId' ],
  data() {
    return {
      submitting: false,
      form: {
        contact: '',
        tel: '',
        email: ''
      },
      // 校验规则
      rules: {
        contact: [
          { required: true, message: '请填写联系人', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请填写联系电话', trigger: 'blur' },
          { pattern: telReg, message: '请输入正确的手机号', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请填写电子邮箱', trigger: 'blur' },
          { pattern: emailReg, message: '请输入正确的邮箱', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    close(reload) {
      this.$refs.ruleForm.resetFields();
      this.$emit('closeDeliver', reload)
    },
    submitHandler() {
      if (this.submitting === true) {
        return false
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.submitting = true
          let data = {
            contact: this.form.contact,
            tel: this.form.tel,
            email: this.form.email,
            orderId: this.orderId
          }
          this.$axios.post('order.savecontact', data).then((res) => {
            if (res.code === 0) {
              this.close(true)
            } else {
              this.submitting = false
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-login {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;

  .footer{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 20px;
  }
}
</style>