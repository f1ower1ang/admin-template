import request from '@/utils/request'
import path from '@/assets/js/path'

export const uploadPic = (name, id, file) => {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: path.pic.upload + `${name}/${id}`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export const getPicList = (name, id) =>
  request({
    url: path.pic.list + `${name}/${id}`,
    method: 'get'
  })

export const showPic = (id) =>
  request({
    url: path.pic.show + id,
    method: 'get'
  })
