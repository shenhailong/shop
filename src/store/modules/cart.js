/*
 * @Description: 购物车
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-03 17:43:25
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-03 18:12:28
 */
import * as CART from '../types/cart'
import { getCartNum } from '@/utils/cart'

const state = {
  num: 0
}

const actions = {}

const getters = {
  [CART.GET_CART_NUM] () {
    return getCartNum()
  }
}

const mutations = {
  [CART.UPDATE_CART_NUM] (state, theme) {
    state.theme = theme
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
