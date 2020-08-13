import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/index/Index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/order',
    name: 'Order',
    meta: {
      authentication: false
    },
    component: () =>
      import(/* webpackChunkName: "order" */ '../views/order/Index.vue')
  },
  // 产品中心
  {
    path: '/productCenter',
    name: 'ProductCenter',
    component: () =>
      import(/* webpackChunkName: "productCenter" */ '../views/productCenter/Index.vue')
  },
  // 公共资料
  {
    path: '/public',
    name: 'Public',
    component: () =>
      import(/* webpackChunkName: "Public" */ '../views/public/Index.vue')
  },
  // 会员资料
  {
    path: '/member',
    name: 'Member',
    component: () =>
      import(/* webpackChunkName: "Member" */ '../views/member/Index.vue')
  },
  // 购物车
  {
    path: '/cart',
    name: 'Cart',
    component: () =>
      import(/* webpackChunkName: "Cart" */ '../views/cart/Index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "order" */ '../views/login/Index.vue')
  },
  // 注册
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/login/Register.vue')
  },
  // 注册
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: () =>
      import(/* webpackChunkName: "ForgetPassword" */ '../views/login/ForgetPassword.vue')
  },
  // 用户中心
  {
    path: '/user',
    name: 'User',
    component: () =>
      import(/* webpackChunkName: "User" */ '../views/user/Index.vue')
  },
  // 会员缴费--选择会员
  {
    path: '/selectMember',
    name: 'SelectMember',
    component: () =>
      import(/* webpackChunkName: "SelectMember" */ '../views/member/SelectMember.vue')
  },
  // 确认订单
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: () =>
      import(/* webpackChunkName: "ConfirmOrder" */ '../views/pay/ConfirmOrder.vue')
  },
  // 微信支付
  {
    path: '/wxPay',
    name: 'WxPay',
    component: () =>
      import(/* webpackChunkName: "WxPay" */ '../views/pay/WxPay.vue')
  },
  // 产品详情
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () =>
      import(/* webpackChunkName: "Detail" */ '../views/productCenter/Detail.vue')
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = false
  // console.log(to.authentication)
  // console.log(to)
  console.log(document)
  
  console.log(document.getElementById('chat'))
  
  if (to.name !== 'Login' && !isAuthenticated && to.meta.authentication) next({ name: 'Login' })
  else next()
})

export default router;
