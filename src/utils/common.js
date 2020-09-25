/*
 * @Description: 公用方法
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-04 10:01:11
 * @LastEditors: Dragon
 * @LastEditTime: 2020-09-25 20:09:56
 */
import { TOKEN } from '@/constants/key'
import { USER_INFO } from '@/constants/key'

const getToken = function() {
  return window.localStorage.getItem(TOKEN)
}
const setToken = function(token) {
  window.localStorage.setItem(TOKEN, token)
}

// 获取用户
const getUser = function() {
  return window.localStorage.getItem(USER_INFO) ? JSON.parse(window.localStorage.getItem(USER_INFO)) : null
}

const setUser = function(userInfo) {
  window.localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
}
export {
  getToken,
  getUser,
  setUser,
  setToken
}