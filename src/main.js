import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './utils/axios'
import './scss/styles.scss';
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
