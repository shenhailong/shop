/**
 * @description: 未登录的时候操作购物车
 * @param {type}
 * @return:
 * @author: Dragon
 */
import { CART_LIST } from '@/constants/key'

// 获取购物车
const getCart = function() {
  let cartList = window.localStorage.getItem(CART_LIST)
  return cartList ? JSON.parse(cartList) : cartList
}

// 设置购物车
const setCart = function() {
  let cartList = window.localStorage.getItem(CART_LIST)
  if(cartList){
    console.log(1)
  }else{
    window.localStorage.setItem(CART_LIST, JSON.stringify(this.selectList))
  }
}

export {
  getCart,
  setCart
}