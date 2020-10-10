/*
 * @Description: 公用
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-14 09:14:09
 * @LastEditors: Dragon
 * @LastEditTime: 2020-10-10 12:12:56
 */
const HIDE_CHAT_LIST = [
  'Login',
  'Register',
  'ForgetPassword'
]
console.log(window.location.host)
console.log(process.env.NODE_ENV)
function env() {
  if(process.env.NODE_ENV === 'development' || (window.location.host === 'http://121.89.171.172')){
    return 'http://39.100.227.252:888'
  }
  return window.location.host
}
const BASE_URL = env()

export { HIDE_CHAT_LIST, BASE_URL }