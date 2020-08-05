<!--
 * @Description: 用户信息
 * @Version: 1.0.0
 * @Autor: Dragon
 * @Date: 2020-07-27 13:32:56
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-05 18:19:12
-->
<template>
  <div class="user-wrap">
    <div v-for="item in infoList" :key="item.label" class="item">
      <div class="label">{{item.label}}</div>
      <template v-if="item.type === 'img'">
        <img :src="item.src" class="img" />
      </template>
      <template v-else>
        <div class="value">{{item.value}}</div>
        <el-button v-if="item.type === 'score'" type="primary" @click="goScore">查看积分</el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      infoList: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.infoList = [{
        label: '用户名:',
        value: 'Dragon'
      }, {
        label: '用户状态:',
        value: '审核中'
      }, {
        label: '公司全称:',
        value: 'Dragon'
      }, {
        label: '社会统一信用代码:',
        value: 'Dragon'
      }, {
        label: '会员级别:',
        value: 'Dragon'
      }, {
        label: '会员有效期:',
        value: 'Dragon'
      }, {
        label: '我的邀请码:',
        value: 'Dragon'
      }, {
        label: '会员邀请积分:',
        value: '100分',
        type: 'score'
      }, {
        label: '通讯地址:',
        value: 'Dragon'
      }, {
        label: '联系人:',
        value: 'Dragon'
      }, {
        label: '联系电话:',
        value: 'Dragon'
      }, {
        label: '营业执照:',
        src: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1596437765&di=90ff6bf6e26673f0c12e2bdc6e891a26&src=http://a4.att.hudong.com/22/59/19300001325156131228593878903.jpg',
        type: 'img'
      }]
    },
    // 跳转积分页面
    goScore() {
      this.$emit('changeTab', '4')
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
  }

  .img{
    height: 200px;
    width: 400px;
  }
}
</style>