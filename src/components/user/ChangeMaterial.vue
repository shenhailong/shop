<template>
  <div class="wrap-login">
    <div class="login-card">
      <div class="login-view-box form-con">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="公司全称" prop="company">
            <el-input v-model="ruleForm.company" maxlength="20" placeholder="请填写公司全称"></el-input>
          </el-form-item>
          <el-form-item label="通讯地址" prop="txdz">
            <el-input v-model="ruleForm.txdz" maxlength="30" placeholder="请填写通讯地址"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="ruleForm.contact" maxlength="25" placeholder="请填写联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="conphone">
            <el-input v-model="ruleForm.conphone" maxlength="20" placeholder="请填写联系电话"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="ruleForm.email" maxlength="25" placeholder="请填写电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="营业执照" prop="imgPath">
            <el-upload :headers="{'api-action': 'user.upload'}" action="/cnas/v1" name="yyzzFile" list-type="picture" accept="image/png,image/jpg,image/jpeg" :file-list="fileList" :limit="1" :on-exceed="handleExceed" :before-upload="handleBeforeUpload" :on-success="handleSuccess" :on-remove="handleRemove" :disabled="uploading">
              <el-button size="small" type="primary" :loading="uploading">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="color: #f56c6c;margin-left: 5px">只能上传jpg/png文件，且不超过1M</span>
              </el-upload>
          </el-form-item>
          <el-form-item label="身份证" prop="idcard">
            <el-input v-model="ruleForm.idcard" maxlength="18" placeholder="请填写身份证"></el-input>
          </el-form-item>
          <el-form-item label="申请人身份证" prop="imgPath">
            <el-upload :headers="{'api-action': 'user.upload'}" action="/cnas/v1"
            list-type="picture" name="idCardFile" accept="image/png,image/jpg,image/jpeg" :file-list="idCardFileList" :limit="1" :on-exceed="handleExceed" :before-upload="handleBeforeUpload" :on-success="idCardHandleSuccess" :on-remove="idCardHandleRemove" :disabled="uploading">
              <el-button size="small" type="primary" :loading="uploading">点击上传</el-button>
              <span slot="tip" class="el-upload__tip" style="color: #f56c6c;margin-left: 5px">营业执照副本扫描件（加盖公章）</span>
              </el-upload>
          </el-form-item>
          <div class="footer">
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button :loading="submitting" :disabled="submitting" type="primary" @click="submitHandler('ruleForm')">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { emailReg } from '@/utils/regular'

export default {
  data() {
    return {
      submitting: false,
      fileList: [],
      idCardFileList: [],
      ruleForm: {
        company: '', // 公司全称
        txdz: '', // 通讯地址
        contact: '',
        conphone: '',
        email: '',
        yyzz: '',
        idcard: '',
        idcardurl: ''
      },
      uploading: false,
      rules: {
        company: [
          { required: true, message: '请填写公司全称', trigger: 'change' }
        ],
        idcard: [
          { required: true, message: '请填写身份证', trigger: 'change' },
          { pattern: /(^\d{15}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请填写联系人', trigger: 'change' }
        ],
        conphone: [
          { required: true, message: '请填写联系电话', trigger: 'change' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写电子邮箱', trigger: 'blur' },
          { pattern: emailReg, message: '请输入正确的邮箱', trigger: 'blur' },
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
        if (valid) {
          if(this.ruleForm.yyzz === ''){
            this.$message.error('请上传营业执照')
            return
          }
          if(this.ruleForm.idcardurl === ''){
            this.$message.error('请上传申请人身份证')
            return
          }
          this.submitting = true
          let data = {
            company: this.ruleForm.company,
            txdz: this.ruleForm.txdz,
            idcard: this.ruleForm.idcard,
            contact: this.ruleForm.contact,
            conphone: this.ruleForm.conphone,
            email: this.ruleForm.email,
            yyzz: this.ruleForm.yyzz,
            idcardurl: this.ruleForm.idcardurl
          }
          this.$axios.post('user.update', data).then((res) => {
            if (res.code === 0) {
              this.$notify({
                type: 'success',
                title: '更新成功',
                duration: 1000
              })
            }else{
              this.submitting = false
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
      console.log(file)
      // this.uploading = true
      // // 限制图片大小
      // const isLt1M = file.size / 1024 / 1024 < 1
      // if (!isLt1M) {
      //   this.$message.error('上传头像图片大小不能超过 1MB!')
      //   this.uploading = false
      // }
      // return isLt1M
    },
    handleSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.ruleForm.yyzz = response.data
        this.fileList = fileList
        this.uploading = false
      } else {
        this.uploading = false
      }
    },
    handleExceed() {
      this.$message.warning('请先删除后再上传')
    },
    // 上传图片操作
    idCardHandleRemove(file, fileList) {
      this.ruleForm.idcardurl = ''
      this.idCardFileList = fileList
    },
    idCardHandleSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.ruleForm.idcardurl = response.data
        this.idCardFileList = fileList
        this.uploading = false
      } else {
        this.uploading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-login {
  width: 100%;
  min-height: 400px;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 20px;
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