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
              <el-col :span="11">
                <el-input v-model="ruleForm.name" placeholder="请填写用户名" maxlength="20"></el-input>
              </el-col>
              <el-col :span="13">
              <span class="tip">4 ~ 20位数字或者字母(区分大小写)</span>
              </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-col :span="11">
                <el-input v-model="ruleForm.password" placeholder="请填写密码" maxlength="20"></el-input>
              </el-col>
              <el-col :span="13">
              <span class="tip">6 ~ 20位数字或者字母(区分大小写)</span>
              </el-col>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="ruleForm.confirmPassword" placeholder="请填写确认密码"></el-input>
            </el-form-item>
            <el-form-item label="公司全称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请填写公司全称"></el-input>
            </el-form-item>
            <el-form-item label="社会统一信用代码" prop="code">
              <el-input v-model="ruleForm.code" placeholder="请填写社会统一信用代码"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址" prop="address">
              <el-input v-model="ruleForm.address" placeholder="请填写通讯地址"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="people">
              <el-input v-model="ruleForm.people" placeholder="请填写联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="mobile">
              <el-input v-model="ruleForm.mobile" placeholder="请填写联系电话"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="ruleForm.email" placeholder="message"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="imgPath">
              <el-upload :headers="{token: 1}" action="/erp/api/attachment/upload" :data="uploadData" list-type="picture" accept="image/png,image/jpg,image/jpeg" :file-list="fileList" :limit="1" :on-exceed="handleExceed" :before-upload="handleBeforeUpload" :on-success="handleSuccess" :on-remove="handleRemove" :disabled="uploading">
                <el-button size="small" type="primary" :loading="uploading">点击上传</el-button>
                <span slot="tip" class="el-upload__tip" style="color: #f56c6c;margin-left: 5px">只能上传jpg/png文件，且不超过1M</span>
                </el-upload>
            </el-form-item>
            <el-form-item label="图片" prop="imgPath">
              <el-upload :headers="{token: 1}" action="/erp/api/attachment/upload" :data="uploadData" list-type="picture" accept="image/png,image/jpg,image/jpeg" :file-list="fileList" :limit="1" :on-exceed="handleExceed" :before-upload="handleBeforeUpload" :on-success="handleSuccess" :on-remove="handleRemove" :disabled="uploading">
                <el-button size="small" type="primary" :loading="uploading">点击上传</el-button>
                <span slot="tip" class="el-upload__tip" style="color: #f56c6c;margin-left: 5px">只能上传jpg/png文件，且不超过1M</span>
                </el-upload>
            </el-form-item>
            <el-form-item label="邀请码" prop="code">
              <el-input v-model="ruleForm.code" placeholder="请填写邀请码"></el-input>
            </el-form-item>
            <!-- <el-form-item> -->
              <div class="footer">
                <el-button @click="$router.back()">返回</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="primary" @click="submitHandler('ruleForm')">注册</el-button>
              </div>
            <!-- </el-form-item> -->
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
      token: '',
      fileList: [],
      ruleForm: {
        name: '',
        password: '',
        confirmPassword: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        code: ''
      },
      uploading: false,
      uploadData: {
        type: 'ERP_PRODUCT'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请填写社会统一信用代码', trigger: 'change' }
        ],
        people: [
          { required: true, message: '请填写联系人', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请填写联系电话', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请填写电子邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitHandler() {
      if (this.submitting === true) {
        return false
      }
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          let data = {
            username: 21,
            passwd: 22,
            yyzz: 2,
            idcard: 4,
            idcardurl: 1,
            contact: 6,
            conphone: 7,
            txdz: 8,
            email: 9,
            company: 1,
            shtyxydm: 1,
            invitedcode: 2
          }
          // /cnas/v1?username=21&passwd=22&yyzz=3&idcard=4&idcardurl=5&contact=6&conphone=7&txdz=8&email=9&company=10&shtyxydm=11&invitedcode=12
          axios.post('/cnas/v1', data).then((res) => {
            if (res.data.code === 1) {
              this.$router.replace('login')
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 上传图片操作
    handleRemove(file, fileList) {
      this.ruleForm.imgPath = ''
      this.fileList = fileList
    },
    handleBeforeUpload(file) {
      this.uploading = true
      // 限制图片大小
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
        this.uploading = false
      }
      return isLt1M
    },
    handleSuccess(response, file, fileList) {
      if (response.code === 1) {
        this.ruleForm.imgPath = response.data.path
        this.fileList = fileList
        this.uploading = false
      } else {
        this.uploading = false
      }
    },
    handleExceed(files, fileList) {
      console.log(files)
      console.log(fileList)
      this.$message.warning('请先删除后再上传')
    },
  }
}
</script>

<style lang="scss" scoped>
.wrap-login {
  width: 100%;
  height: 100vh;
  background: url(~@/assets/login-bg.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: scroll;
  padding-top: 10px;
  box-sizing: border-box;
  .login-card{
    width: 600px;
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

  .tip{
    margin-left: 10px;
  }

  .footer{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 20px;
  }
}
</style>