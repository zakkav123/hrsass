import request from '@/utils/request'
/**
 * 获取角色列表
 * ***/
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

export function addRoleList(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

export function getRoleDetail(id) {
  return request({
    url: `/company/${id}`
  })
}
