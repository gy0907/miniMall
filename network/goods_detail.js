import request from "./reuqest"

export function getGoodsDetail(data) {
  return request({
    url: '/goods/detail',
    data
  })
}