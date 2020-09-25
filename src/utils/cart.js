/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-07-30 14:28:59
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-25 10:47:11
 */
/**
 * @description: 未登录的时候操作本地存储购物车
 * @param {type}
 * @return:
 * @author: Dragon
 */
import { TOKEN } from '@/constants/key'
import vm from '@/main'

// 更新购物车的数量
const updateCartNum = function() {
  let token = window.localStorage.getItem(TOKEN)
  if(token){
    vm.$store.dispatch('UPDATE_CART_NUM')
  }
}

// 获取购物车的数量
const getCartNum = async function() {
  const res = await vm.$axios.post('shopcar.list')
  if (res.code === 0){
    let num = 0
    res.data.forEach(item => {
      num += item.amount
    });
    return num
  }
}

export {
  updateCartNum,
  getCartNum
}