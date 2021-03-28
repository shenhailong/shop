/*
 * @Description: 公用方法
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-04 10:01:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-28 16:03:59
 */
import { TOKEN } from '@/constants/key'
import { USER_INFO } from '@/constants/key'

const getToken = function() {
  return window.sessionStorage.getItem(TOKEN)
}
const setToken = function(token) {
  window.sessionStorage.setItem(TOKEN, token)
}

const removeToken = function() {
  window.sessionStorage.removeItem(TOKEN)
}

// 获取用户
const getUser = function() {
  return window.sessionStorage.getItem(USER_INFO) ? JSON.parse(window.sessionStorage.getItem(USER_INFO)) : null
}

const setUser = function(userInfo) {
  window.sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo))
}

const removeUser = function() {
  window.sessionStorage.removeItem(USER_INFO)
}
export {
  getToken,
  getUser,
  setUser,
  setToken,
  removeUser,
  removeToken
}