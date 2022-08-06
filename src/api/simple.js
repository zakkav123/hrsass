import request from '@/utils/request'
// 获取列表员工数据
export function getManager() {
  return request({
    url: '/sys/user/simple'
  })
}
// 添加员工事件

export function setManager(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
