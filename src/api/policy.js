import request from '@/utils/request.js'
import path from '@/assets/js/path.js'

export function getLawType() {
  return request({
    url: path.policy.category,
    method: 'get'
  })
}

export function getLawList() {
  return request({
    url: path.policy.list,
    method: 'get'
  })
}

export function addOrEditLaw(data) {
  return request({
    url: path.policy.add,
    method: 'post',
    data
  })
}

export function delLaw(id) {
  return request({
    url: path.policy.del + id,
    method: 'delete'
  })
}

export function getTypeOfLaw(id) {
  return request({
    url: path.policy.toList + id,
    method: 'get'
  })
}
