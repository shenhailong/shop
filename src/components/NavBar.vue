<template>
  <div class="wrap-header">
    <header class="main-header">
      <div class="container">
        <div class="logo">
          <img src="../assets/logo.png" />
        </div>
        <ul class="bar">
          <li v-for="(item, index) in list" :key="index" @click="changePage(item.url)" :class="{active: current === item.value }" class="item">{{item.name}}</li>
        </ul>
        <div @click="dialogVisible = true" class="sign-out-box">
          <div class="icon"></div>
          <div class="text">退出</div>
        </div>
      </div>
    </header>
    <el-dialog
      :visible.sync="dialogVisible"
      width="300px"
      append-to-body
      center>
      <div style="text-align: center;font-size: 18px">您确定退出登录？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="signOut">确 定</el-button>
      </span>
    </el-dialog>
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
          url: '/productCenter',
          name: '产品中心',
          value: 'productCenter'
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
          url: '/order',
          name: '订单中心',
          value: 'order'
        },
        {
          url: '/about',
          name: '个人中心',
          value: 'about'
        }
      ],
      dialogVisible: false
    }
  },
  methods: {
    changePage(url) {
      this.$router.push(url)
    },
    // 退出
    signOut() {
      console.log(this.$route.path)
      this.dialogVisible = false
      // this.$route.path !== '/' && this.$router.replace('/')
      this.$router.push('login')
    }
  }
}
</script>
