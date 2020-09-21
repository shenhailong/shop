<!--
 * @Description: 选择会员页面
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-27 17:27:10
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-21 17:10:07
-->
<template>
  <div class="member-select">
    <NavBar current="user" />
    <div class="content">
      <h2 v-if="isMember" class="title">{{tip}}</h2>
      <div class="member-item">
        <div v-for="item in memberList" :key="item.id" class="item">{{item.membername}}年费:
          <span class="text">{{item.nianfei}} <span class="unit">元</span></span>
        </div>
      </div>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="购买方式">
          <div class="tab">
            <div @click="type = 'buy'" :class="{ active : type == 'buy'}" class="item">购买会员</div>
            <div @click="type = 'upgrade'" :class="{ active : type == 'upgrade'}" class="item">升级会员</div>
          </div>
        </el-form-item>

        <div v-if="type === 'buy'" class="">
          <el-form-item label="会员等级" prop="buy">
            <el-radio-group @change="radioBuyChange" v-model="ruleForm.buy">
              <el-radio v-for="item in memberList" :key="item.id" :label="item.level" border>
                {{item.membername}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div v-else class="">
          <el-form-item label="会员等级" prop="upgrade">
            <el-radio-group @change="radioUpgradeChange" v-model="ruleForm.upgrade">
              <el-radio v-for="item in upgradeList" :key="item.id" :label="item.level" border>
                {{item.membername}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <el-form-item label="开始日期" required>
          <el-col :span="10">
            <el-form-item prop="hyksrq">
              <el-date-picker :picker-options="pickerOptions" type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="ruleForm.hyksrq" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="缴费金额:">
          <div class="money-wrap">
            <span class="text">{{total}} <span class="unit">元</span></span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import { getUser } from '@/utils/common'
import { getDate } from '@/utils/tools'
import { USER_LEVEL } from '@/constants/status'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      type: 'buy', // 升级(upgrade) | 购买(buy)
      payType: null,
      memberList: [],
      upgradeList: [], // 升级会员列表
      loading: false,
      total: 0, // 缴费金额
      tip: '',
      userhyjsrq: '',
      isMember: false, // 是否是会员
      pickerOptions: {
        disabledDate: (time) => {
          let date = (new Date).getTime() - 24 * 60 * 60 * 1000;
          let yesterday = new Date(date);
          return time < yesterday
        }
      },
      ruleForm: {
        hyksrq: '',
        buy: '',
        upgrade: ''
      },
      rules: {
        hyksrq: [
          { type: 'string', required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        buy: [
          { required: true, message: '请选择需要购买的会员级别', trigger: 'change' }
        ],
        upgrade: [
          { required: true, message: '请选择需要升级的会员级别', trigger: 'change' }
        ],
      }
    }
  },
  mounted() {
    this.getMemberlist()
    this.getUpgradeList()
    if(getUser()){
      let user = getUser()
      if(user.corp.level > 2) {
        this.isMember = true
        this.userLevel = user.corp.level
        this.getMemberlast()
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 会员信息
    getMemberlist() {
      this.$axios.get('member.memberlist').then((res) => {
        if (res.code === 0) {
          this.memberList = res.data
        }
      })
    },
    // 最后购买的会员信息
    getMemberlast() {
      this.$axios.get('member.last').then((res) => {
        if (res.code === 0) {
          let { mid, hyjsrq } = res.data
          this.userhyjsrq = hyjsrq
          this.tip = `您的${USER_LEVEL[mid]}将于${getDate(hyjsrq, true)}到期`
        }
      })
    },
    // 获取升级会员列表
    getUpgradeList() {
      this.$axios.post('member.toupgrade').then((res) => {
        if (res.code === 0) {
          this.upgradeList = res.data
        }
      })
    },
    // 切换选中项
    radioBuyChange(value) {
      this.findTotal(value, 'buy')
    },
    // 切换选中项
    radioUpgradeChange(value) {
      this.findTotal(value, 'upgrade')
    },
    // 找出金额
    findTotal(value, type) {
      let total = 0
      if(type === 'buy'){
        this.memberList.forEach(item => {
          if(item.level === value){
            total = item.nianfei
          }
        })
      }else{
        this.upgradeList.forEach(item => {
          if(item.level === value){
            total = item.nianfei
          }
        })
      }
      this.total = total
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        }
      });
    },
    submit() {
      // 是会员: 购买只能选择到期之后的日期,升级不受影响
      // 不是会员: 购买或升级都可以
      if(this.isMember){
        let hyksrq = new Date(this.ruleForm.hyksrq.replace(/\-/g, '\/')).getTime()
        if(this.type === 'buy' && hyksrq <= this.userhyjsrq){
          this.$message.error('开始日期必须是会员结束日期之后')
          return
        }
      }
      this.loading = true
      if(this.type === 'buy'){
        this.buyMember()
      }else{
        this.upgradeMember()
      }
    },
    // 购买会员
    buyMember() {
      this.$axios.post('member.buy', {
        'mid': this.ruleForm.buy,
        'hyksrq': this.ruleForm.hyksrq
      }).then((res) => {
        if (res.code === 0) {
          this.next(res.data.id)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 升级会员
    upgradeMember() {
      this.$axios.post('member.upgrade', {
        'mid': this.ruleForm.upgrade,
        'hyksrq': this.ruleForm.hyksrq
      }).then((res) => {
        if (res.code === 0) {
          this.next(res.data.id)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    next(id) {
      this.$router.push(`confirmMember/${id}`)
    }
  },
  watch: {
    type (value) {
      if(value === 'buy' && this.ruleForm.buy !== ''){
        this.findTotal(this.ruleForm.buy, 'buy')
      }else if(value === 'upgrade' && this.ruleForm.upgrade !== ''){
        this.findTotal(this.ruleForm.upgrade, 'upgrade')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/scss/utils/theme.scss';

.member-select{
  .content{
    background: #ffffff;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    padding-bottom: 50px;
  }

  .title{
    margin-bottom: 20px;
  }

  .member-item{
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    .item{
      width: 50%;
      font-size: 16px;
      padding: 20px;
      text-align: center;
      border: 1px solid #e4e7f1;
    }

    .text{
      font-size: 20px;
      font-weight: 600;
      color: $color-primary;
    }

    .unit{
      font-size: 14px;
    }
  }

  .tab{
    // margin-bottom: 20px;
    display: flex;

    .item{
      width: 100px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      padding: 0 10px;
      background: $color-gray;
      border-radius: 50px;
      margin-right: 5px;
      &.active{
        background: $color-primary;
        color: #ffffff;
      }
    }
  }

  .money-wrap{
    font-size: 16px;
    line-height: 30px;
    margin: 5px 0;
    .text{
      font-size: 20px;
      font-weight: 600;
      color: $color-primary;
    }

    .unit{
      font-size: 14px;
    }
  }

}
</style>