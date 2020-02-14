import request from './reuqest'

export function getBannerData() {
  return request({
    url: '/home/swiperdata'
  })
}

// 获取首页目录分类
export function getCatitems() {
  return request({
    url: '/home/catitems'
  })
}

// 获取楼层数据
export function getFloorList() {
  return request({
    url: '/home/floordata'
  })
}