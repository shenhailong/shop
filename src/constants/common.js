/*
 * @Description: 公用
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-14 09:14:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-28 14:10:28
 */
const HIDE_CHAT_LIST = [
  'Login',
  'Register',
  'ForgetPassword'
]
console.log(window.location.host)
console.log(process.env.NODE_ENV)
function env() {
  if(process.env.NODE_ENV === 'development' || (window.location.host === '121.89.171.172')){
    return 'http://47.95.209.168:80'
  }
  return `http://${window.location.host}`
}
const BASE_URL = env()

export { HIDE_CHAT_LIST, BASE_URL }