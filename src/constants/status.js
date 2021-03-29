/*
 * @Description:
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-09-25 14:40:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-29 09:00:27
 */
// 注册状态
const STATUS_REGISTER = {
  1: '审核中',
  2: '审核通过',
  3: '审核拒绝'
}

// 会员等级 (后台定义的mid和member.id是会员等级, level是会员权限)
const USER_LEVEL = {
  1: '游客',
  2: '普通会员',
  3: '初级会员',
  4: '中级会员',
  5: '高级会员',
  6: '终身会员'
}

const AUDIT_STATUS = {
  1: '待审核',
  2: '已支付',
  3: '审核拒绝',
  4: '待支付'

}

export { STATUS_REGISTER, USER_LEVEL, AUDIT_STATUS }