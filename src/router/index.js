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
    path: '/order',
    name: 'Order',
    meta: {
      authentication: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "order" */ '../views/login/Index.vue')
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = false
  console.log(to.authentication)
  console.log(to)
  if (to.name !== 'Login' && !isAuthenticated && to.meta.authentication) next({ name: 'Login' })
  else next()
})

export default router;
