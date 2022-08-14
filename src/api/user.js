import request from '@/utils/request'

/**
 *
 * @param {表单输入内容} data
 * @returns
 */
// 登录获取token接口
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 用户信息获取接口
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 获取用户详细信息
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
