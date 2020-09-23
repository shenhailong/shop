<!--
 * @Description: 用户信息
 * @Version: 1.0.0
 * @Autor: Dragon
 * @Date: 2020-07-27 13:32:56
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-23 13:12:06
-->
<template>
  <div class="user-wrap">
    <div v-for="item in infoList" :key="item.label" v-show="!item.hide" class="item">
      <div class="label">{{item.label}}</div>
      <template v-if="item.type === 'img'">
        <img :src="item.src" class="img" />
      </template>
      <template v-else>
        <div class="value">{{item.value}}</div>
        <el-button v-if="item.type === 'score'" type="primary" @click="goScore">查看积分</el-button>
        <el-button v-if="item.type === 'member'" type="primary" @click="goSelectMember">购买会员</el-button>
      </template>
    </div>
    <el-button class="cancel-btn" type="danger" @click="cancelUser">注销用户</el-button>
  </div>
</template>

<script>
import { STATUS_REGISTER, USER_LEVEL } from '@/constants/status'
import { getUser } from '@/utils/common'
import { getDate } from '@/utils/tools'

export default {
  data() {
    return {
      infoList: [],
      userInfo: null
    }
  },
  mounted() {
    if(getUser()){
      this.userInfo = getUser()
      this.initData(this.userInfo)
    }
  },
  methods: {
    initData(user) {
      this.infoList = [{
        label: '用户名:',
        value: user.username
      }, {
        label: '用户状态:',
        value: STATUS_REGISTER[user.status]
      }, {
        label: '公司全称:',
        value: user.corp.company
      }, {
        label: '社会统一信用代码:',
        value: user.corp.shtyxydm
      }, {
        label: '会员级别:',
        value: USER_LEVEL[user.corp.mid],
        type: 'member'
      }, {
        label: '会员有效期:',
        value: this.date(user.corp.hyjsrq),
        hide: !user.corp.hyjsrq
      }, {
        label: '我的邀请码:',
        value: user.corp.invitecode
      }, {
        label: '会员邀请积分:',
        value: user.corp.jfye,
        type: 'score'
      }, {
        label: '通讯地址:',
        value: user.txdz
      }, {
        label: '联系人:',
        value: user.contact
      }, {
        label: '联系电话:',
        value: user.conphone
      }, {
        label: '营业执照:',
        src: user.yyzz,
        type: 'img'
      }]
    },
    date(value) {
      return getDate(value, true)
    },
    // 跳转积分页面
    goScore() {
      this.$emit('changeTab', '4')
    },
    // 跳转选择会员
    goSelectMember() {
      this.$router.push('selectMember')
    },
    // 注销用户
    cancelUser() {
      this.$confirm('确定注销该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.$axios.get('user.cancel').then((res) => {
          if (res.code === 0) {
            this.$router.replace('index')
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.user-wrap{
  width: 60%;
  margin: 0 auto;
}
.item{
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  // border-bottom: 1px solid #eeeeee;
  .label{
    width: 150px;
    text-align: right;
    margin-right: 15px;
    color: #999;
  }
  .value{
    margin-right: 30px;
    min-width: 100px;
  }

  .img{
    height: 200px;
    width: 400px;
  }

  
}
.cancel-btn{
  margin: 30px 0 50px 165px;
}
</style>