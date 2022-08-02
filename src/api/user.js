import request from '@/utils/request'


/**
 * 
 * @param {表单输入内容} data 
 * @returns 
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
