/*
 * @Description: 公用方法
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-04 10:01:11
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-04 10:02:25
 */
import { TOKEN } from '@/constants/key'

const getToken = function() {
  return window.localStorage.getItem(TOKEN)
}

export {
  getToken
}