import request from '@/utils/request'
import path from '@/assets/js/path'

export const getStartupList = () =>
  request({
    url: path.startup.list,
    method: 'get'
  })

export const addOrEditStartup = (data) =>
  request({
    url: path.startup.add,
    method: 'post',
    data
  })

export const delStartup = (id) => {
  return request({
    url: path.startup.del + id,
    method: 'delete'
  })
}

export const searchStartup = (params) => {
  return request({
    url: path.startup.search,
    method: 'get',
    params
  })
}
