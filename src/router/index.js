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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "order" */ '../views/order/Index.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
