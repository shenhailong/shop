/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-09-22 13:15:10
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-22 13:17:09
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './utils/axios';
import './scss/styles.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const install = function (Vue) {
  Object.defineProperty(Vue.prototype, '$axios', { value: axios })
}
Vue.use(install)
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
