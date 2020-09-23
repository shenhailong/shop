/*
 * @Description: 购物车
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-03 17:43:25
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-23 17:54:36
 */
import * as CART from '../types/cart'
import { getCartNum } from '@/utils/cart'
import { getToken } from '@/utils/common'

const state = {
  cartCount: 0
}

const actions = {
  // 获取购物车数量,更新
  async [CART.UPDATE_CART_NUM] ({ commit }) {
    getToken() ? commit(CART.UPDATE_CART_NUM, await getCartNum()) : commit(CART.UPDATE_CART_NUM, 0)
  },
}

const getters = {
  [CART.GET_CART_NUM] (state) {
    return state.cartCount
  }
}

const mutations = {
  [CART.UPDATE_CART_NUM] (state, data) {
    state.cartCount = data
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
