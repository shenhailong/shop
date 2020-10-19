<template>
  <div class="wrap-header">
    <header class="main-header">
      <div class="container">
        <div @click="goIndex" class="logo">
          <img src="../assets/logo.png" />
        </div>
        <ul class="bar">
          <li v-for="(items, index) in list" :key="index" @click="changePage(items)" :class="{active: current === items.value }" class="item">
            {{items.name}}
            <div v-if="items.value === 'cart' && cartCount && cartCount !== 0" class="badge">{{cartCount > 99 ? '99+' : cartCount}}</div>
            <div v-if="items.children" class="child">
              <div v-for="(item, index) in items.children" :key="index" @click.stop="childChangePage(item)" :class="{active: current === item.value && item.query && ($route.query.type === item.query.type)}" class="child-item">
                {{item.name}}
              </div>
            </div>
          </li>
        </ul>
        <div v-if="token" class="user-login">
          <div>您好：{{userInfo.username}}</div>
          <div  @click="dialogVisible = true" class="sign-out-box">
            <div class="icon"></div>
            <div class="text">退出</div>
          </div>
        </div>
        <div v-else @click="$router.push('/login')" class="login-text">请登录</div>
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
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/common'
import * as CART from '@store/types/cart'
import { TOKEN, USER_INFO } from '@/constants/key'
import { updateCartNum } from '@/utils/cart'

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
              type: '1'
            }
          }, {
            url: '/member',
            name: '最佳实践',
            value: 'member',
            query: {
              type: '2'
            }
          }, {
            url: '/member',
            name: '其他',
            value: 'member',
            query: {
              type: '3'
            }
          }]
        },
        {
          url: '/productCenter',
          name: '产品中心',
          value: 'productCenter'
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
      dialogVisible: false,
      token: null,
      userInfo: null
    }
  },
  mounted() {
    this.token = getToken()
    if(window.localStorage.getItem(USER_INFO)){
      this.userInfo = JSON.parse(window.localStorage.getItem(USER_INFO))
    }
    if(this.token){
      this.$nextTick(() => {
        updateCartNum()
      })
    }
  },
  methods: {
    childChangePage(item) {
      if(( this.$route.path === item.url && item.query && this.$route.query.type === item.query.type) || item.children){
        return
      }
      this.$router.push({
        path: item.url,
        query: {
          ...item.query
        }
      })
    },
    changePage(item) {
      if((this.$route.path === item.url) || item.children){
        return
      }
      this.$router.push({
        path: item.url
      })
    },
    goIndex() {
      if(this.$route.path === '/index'){
        return
      }
      this.$router.push({
        path: 'index'
      })
    },
    // 退出
    signOut() {
      this.dialogVisible = false
      window.localStorage.removeItem(TOKEN)
      window.localStorage.removeItem(USER_INFO)
      this.$store.commit(CART.UPDATE_CART_NUM, 0)
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters({
      cartCount: CART.GET_CART_NUM
    })
  }
}
</script>
