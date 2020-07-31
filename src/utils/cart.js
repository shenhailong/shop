/**
 * @description: 未登录的时候操作本地存储购物车
 * @param {type}
 * @return:
 * @author: Dragon
 */
import { CART_LIST } from '@/constants/key'

// 获取本地存储购物车
const getLocalCart = function() {
  let cartList = window.localStorage.getItem(CART_LIST)
  return cartList ? JSON.parse(cartList) : []
}

// 设置本地存储购物车
const setLocalCart = function(list) {
  let cartList = getLocalCart()
  let newList = []
  let idList = []
  if(cartList.length){
    cartList.forEach(items => {
      list.forEach(item => {
        // 本地购物车已经存储的产品(覆盖掉本地存储的)
        if(items.id === item.id && !idList.includes(items.id)){
          newList.push(item)
          idList.push(item.id)
        // 本地购物车没有存储过的产品(存入新的产品)
        }else if(items.id !== item.id && !idList.includes(items.id)){
          newList.push(item)
          idList.push(item.id)
        }
      })
    })
    console.log(newList)
    
  }else{
    window.localStorage.setItem(CART_LIST, JSON.stringify(list))
  }
}

export {
  getLocalCart,
  setLocalCart
}