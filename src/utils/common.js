/*
 * @Description: 公用方法
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-04 10:01:11
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-18 11:04:56
 */
import { TOKEN } from '@/constants/key'
import { USER_INFO } from '@/constants/key'

const getToken = function() {
  return window.localStorage.getItem(TOKEN)
}

// 获取用户
const getUser = function() {
  return window.localStorage.getItem(USER_INFO) ? JSON.parse(window.localStorage.getItem(USER_INFO)) : null
}

export {
  getToken,
  getUser
}