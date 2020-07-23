<template>
  <div class="wrap-header">
    <header class="main-header">
      <div class="container">
        <div class="logo">
          <!-- <img src="../assets/img/logo.jpg" /> -->
        </div>
        <ul class="bar">
          <li v-for="(item, index) in list" :key="index" @click="changePage(item.url)" :class="{active: current === item.value }" class="item">{{item.name}}</li>
        </ul>
        <div class="theme-box">
          <div class="theme-button">切换主题</div>
          
        </div>
      </div>
    </header>
  </div>
</template>

<script>

export default {
  props: {
    current: {
      type: String,
      default: 'index'
    }
  },
  data () {
    return {
      list: [
        {
          url: '/',
          name: '首页',
          value: 'index'
        },
        {
          url: '/game',
          name: '产品中心',
          value: 'game'
        },
        {
          url: '/knowledge',
          name: '公共资料',
          value: 'knowledge'
        },
        {
          url: '/about',
          name: '会员资料',
          value: 'about'
        },
        {
          url: '/about',
          name: '产品有效性查询',
          value: 'about'
        },
        {
          url: '/about',
          name: '购物车',
          value: 'about'
        },
        {
          url: '/about',
          name: '订单中心',
          value: 'about'
        }
      ]
    }
  },
  methods: {
    changePage (url) {
      this.$router.push(url)
    }
  }
}
</script>
