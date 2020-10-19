/*
 * @Description: 正则
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-10-19 10:13:04
 * @LastEditors: Dragon
 * @LastEditTime: 2020-10-19 11:12:41
 */

//  邮箱
const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

function emailRegFun(value) {
  return emailReg.test(value)
}

// 电话
const telReg = /^1[3456789]\d{9}$/

export { emailRegFun, emailReg, telReg }