import request from './reuqest'

export function getCategoryData() {
  return request({
    url: '/categories'
  })
}