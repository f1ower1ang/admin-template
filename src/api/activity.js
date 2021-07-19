import request from '@/utils/request'
import path from '@/assets/js/path'

export const getActivityList = () =>
  request({
    url: path.activity.list,
    method: 'get'
  })

export const addOrEditActivity = (data) =>
  request({
    url: path.activity.add,
    method: 'post',
    data
  })

export const delActivity = (id) =>
  request({
    url: path.activity.del + id,
    method: 'delete'
  })

export const searchActivity = (params) =>
  request({
    url: path.activity.search,
    method: 'get',
    params
  })
