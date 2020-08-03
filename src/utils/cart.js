/**
 * @description: 未登录的时候操作本地存储购物车
 * @param {type}
 * @return:
 * @author: Dragon
 */
import { CART_LIST, TOKEN } from '@/constants/key'

// 获取本地存储购物车
const getLocalCart = function() {
  let cartList = window.localStorage.getItem(CART_LIST)
  return cartList ? JSON.parse(cartList) : []
}

// 设置本地存储购物车
const setLocalCart = function(list) {
  let cartList = getLocalCart()
  let newList = []
  let newIdList = []
  let currentIdList = [] // 新传入的数据的id列表
  // 找出新传入的数据的id列表
  list.forEach(item => {
    currentIdList.push(item.id)
  })

  if(cartList.length){
    // 分2种情况
    // 1、传入的含有本地存储的(新覆旧盖)
    // 2、传入的没有含有存储的,直接存储本地的
    cartList.forEach(carItem => {
      list.forEach(currentItem => {
        // 传入的含有本地存储的(存入新的产品)
        if(currentIdList.includes(carItem.id)){
          if(!newIdList.includes(currentItem.id)){
            newList.push(currentItem)
            newIdList.push(currentItem.id)
          }
        }else{
          // 传入的没有含有存储的
          if(!newIdList.includes(carItem.id)){
            newList.push(carItem)
            newIdList.push(carItem.id)
          }
        }
      })
    })
    window.localStorage.setItem(CART_LIST, JSON.stringify(newList))
  }else{
    window.localStorage.setItem(CART_LIST, JSON.stringify(list))
  }
}

// 获取购物车的数量
const getCartNum = function() {
  let token = window.localStorage.getItem(TOKEN)
  let num = 0
  if(token){
    // this.getServerCart()
  }else{
    let list = getLocalCart()
    list.forEach(item => {
      num += Number(item.num)
    })
  }
  return num
}

export {
  getLocalCart,
  setLocalCart,
  getCartNum
}