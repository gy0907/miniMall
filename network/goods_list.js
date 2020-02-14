import request from "./reuqest"

export function getGoodsList(options) {
  return request({
    url: "/goods/search",
    data: options
  })
}