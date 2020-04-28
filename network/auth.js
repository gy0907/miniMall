import request from "./reuqest"

export function postWxLogin (options) {
  return request({
    url: "/users/wxlogin",
    ...options
  })
}