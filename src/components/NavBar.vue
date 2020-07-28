<template>
  <div class="wrap-header">
    <header class="main-header">
      <div class="container">
        <div class="logo">
          <img src="../assets/logo.png" />
        </div>
        <ul class="bar">
          <li v-for="(items, index) in list" :key="index" @click="changePage(items)" :class="{active: current === items.value }" class="item">
            {{items.name}}
            <div class="child">
              <div v-for="(item, index) in items.children" :key="index" @click.stop="changePage(item)" :class="{active: current === item.value && ($route.query.type === item.query.type)}" class="child-item">
                {{item.name}}
              </div>
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
            url: '/member',
            name: '产品资料',
            value: 'member',
            query: {
              type: 'product'
            }
          }, {
            url: '/member',
            name: '最佳实践',
            value: 'member',
            query: {
              type: 'practice'
            }
          }, {
            url: '/member',
            name: '其他',
            value: 'member',
            query: {
              type: 'other'
            }
          }]
        },
        {
          url: '/cart',
          name: '购物车',
          value: 'cart'
        },
        {
          url: '/order',
          name: '订单中心',
          value: 'order',
          children: [{
            url: '/order',
            name: '平台订单',
            value: 'order',
            query: {
              type: 'platform'
            }
          }, {
            url: '/order',
            name: '原厂订单',
            value: 'order',
            query: {
              type: 'original'
            }
          }]
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
  methods: {
    changePage(item) {
      if((this.$route.path === item.url && this.$route.query.type === item.query.type) || item.children){
        return
      }
      this.$router.push({
        path: item.url,
        query: {
          ...item.query
        }
      })
    },
    // 退出
    signOut() {
      this.dialogVisible = false
      // this.$route.path !== '/' && this.$router.replace('/')
      this.$router.push('login')
    }
  }
}
</script>
