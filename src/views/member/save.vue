<!--
 * @Description: 选择会员页面
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-27 17:27:10
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-15 18:08:34
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

      <div class="tab">
        <div @click="type = 'buy'" :class="{ active : type == 'buy'}" class="item">购买会员</div>
        <div @click="type = 'upgrade'" :class="{ active : type == 'upgrade'}" class="item">升级会员</div>
      </div>

      <div v-if="type === 'buy'" class="">
        <el-radio-group @change="radioBuyChange" v-model="upgrade">
          <el-radio v-for="item in memberList" :key="item.id" :label="item.level" border>
            {{item.membername}}
          </el-radio>
        </el-radio-group>
      </div>
      <div v-else class="">
        <el-radio-group @change="radioUpgradeChange" v-model="buy">
          <el-radio v-for="item in upgradeList" :key="item.id" :label="item.level" border>
            {{item.membername}}
          </el-radio>
        </el-radio-group>
      </div>
      <div class="money-wrap">
        缴费金额: <span class="text">{{total}} <span class="unit">元</span></span>
      </div>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  
  
  <el-form-item label="活动时间" required>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>


  <el-form-item label="特殊资源" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  
  
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
      <div class="footer">
        <el-button :loading="loading" @click="submit" type="primary">提交</el-button>
      </div>
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
      upgrade: '',
      buy: '',
      payType: null,
      memberList: [],
      upgradeList: [], // 升级会员列表
      loading: false,
      total: 0, // 缴费金额
      tip: '',
      isMember: false, // 是否是会员
      ruleForm: {

        date2: '',

        resource: '',
      },
      rules: {

        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],

        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
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
    this.getMemberlast()

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
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
    submit() {
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
        'mid': 3,
        'hyksrq': '2020-09-11',
        'paynum': 1200
      }).then((res) => {
        if (res.code === 0) {
          this.next()
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 升级会员
    upgradeMember() {
      this.$axios.post('member.upgrade', {
        'mid': 3,
        'hyksrq': '2020-09-11',
        'paynum': 1200
      }).then((res) => {
        if (res.code === 0) {
          this.next()
        }
      }).finally(() => {
        this.loading = false
      })
    },
    next() {
      this.$router.push('confirmOrder')
    }
  },
  watch: {
    type (value) {
      console.log(value)
      if(value === 'buy' && this.buy !== ''){
        this.findTotal(this.buy, 'buy')
      }else if(value === 'upgrade' && this.upgrade !== ''){
        this.findTotal(this.upgrade, 'upgrade')
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
    margin-bottom: 20px;
    display: flex;

    .item{
      width: 100px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      padding: 10px;
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
    margin: 20px 0;
    .text{
      font-size: 20px;
      font-weight: 600;
      color: $color-primary;
    }

    .unit{
      font-size: 14px;
    }
  }

  .footer{
    margin-top: 20px;
    display: flex;
    padding: 20px;
    flex-direction: row-reverse;
  }
}
</style>