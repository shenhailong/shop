<!--
 * @Description: 选择会员页面
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-27 17:27:10
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-11 15:51:38
-->
<template>
  <div class="member-select">
    <NavBar current="user" />
    <div class="content">
      <h2 class="title">您的中级会员将于2010-08-02到期</h2>
      <div class="member-item">
        <div class="item">初级会员年费: <span class="text">1200 <span class="unit">元</span></span></div>
        <div class="item">中级会员年费: <span class="text">1200 <span class="unit">元</span></span></div>
      </div>
      <div class="member-item">
        <div class="item">高级会员年费: <span class="text">1200 <span class="unit">元</span></span></div>
        <div class="item">终身会员年费: <span class="text">1200 <span class="unit">元</span></span></div>
      </div>
      <div class="tab">
        <div @click="type = 'update'" :class="{ active : type == 'update'}" class="item">升级会员</div>
        <div @click="type = 'buy'" :class="{ active : type == 'buy'}" class="item">购买会员</div>
      </div>

      <div v-if="type === 'update'" class="">
        <el-radio-group v-model="update">
          <el-radio :label="6" border>中级会员</el-radio>
          <el-radio :label="9" border>高级会员</el-radio>
          <el-radio :label="10" border>终身会员</el-radio>
        </el-radio-group>
      </div>
      <div v-else class="">
        <el-radio-group v-model="buy">
          <el-radio :label="3" border>初级会员</el-radio>
          <el-radio :label="6" border>中级会员</el-radio>
          <el-radio :label="9" border>高级会员</el-radio>
          <el-radio :label="10" border>终身会员</el-radio>
        </el-radio-group>
      </div>
      <div class="money-wrap">
        缴费金额: <span class="text">1200 <span class="unit">元</span></span>
      </div>
      <div class="footer">
        <el-button @click="next" type="primary">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      type: 'update', // 升级(update) | 购买(buy)
      update: null,
      buy: null,
      payType: null
    }
  },
  mounted() {

  },
  methods: {
    next() {
      this.$router.push('confirmOrder')
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
  }

  .title{
    margin-bottom: 20px;
  }

  .member-item{
    display: flex;
    width: 100%;
    margin-bottom: 10px;
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