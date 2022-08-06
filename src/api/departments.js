import request from '@/utils/request'
// 获取列表数据树形数据
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
// 删除列表数据
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

export function putDepartments(id) {
  return request({
    url: `/company/department/${id}`
  })
}

export function Departments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
