<template>
  <div class="wrap-header">
    <header class="main-header">
      <div class="container">
        <div class="logo">
          <img src="../assets/logo.png" />
        </div>
        <ul class="bar">
          <li v-for="(items, index) in list" :key="index" @click="changePage(items.url)" :class="{active: current === items.value }" class="item">
            {{items.name}}
            <div class="child">
            <div v-for="(item, index) in items.children" :key="index" @click="changePage(item.url)" :class="{active: current === item.value }" class="child-item">{{item.name}}</div>
            </div>
          </li>
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
          url: '/public',
          name: '公共资料',
          value: 'public'
        },
        {
          url: '/member',
          name: '会员资料',
          value: 'member',
          children: [{
            url: '/member?type=product',
            name: '产品资料',
            value: 'member',
          }, {
            url: '/member?type=practice',
            name: '最佳实践',
            value: 'member',
          }, {
            url: '/member?type=other',
            name: '其他',
            value: 'member',
          }]
        },
        {
          url: '/about',
          name: '产品有效性查询',
          value: 'about'
        },
        {
          url: '/cart',
          name: '购物车',
          value: 'cart'
        },
        {
          url: '/order',
          name: '订单中心',
          value: 'order'
        },
        {
          url: '/user',
          name: '用户中心',
          value: 'user'
        }
      ],
      dialogVisible: false
    }
  },
  mounted() {
    console.log(this.$route)
    
  },
  methods: {
    changePage(url) {
      console.log(url)
      
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
