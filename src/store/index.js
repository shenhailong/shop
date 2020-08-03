/*
 * @Description:
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-24 10:01:11
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-03 17:49:01
 */
import Vue from 'vue';
import Vuex from 'vuex';
import cart from './modules/cart'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cart
  }
});
