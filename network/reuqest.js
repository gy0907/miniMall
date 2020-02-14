// 解决多个异步请求时的Loading图标消失问题
let ajaxCount = 0
function request(options) {
  ajaxCount++
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1' + options.url,
      data: options.data,
      timeout: 10000,
      success: (res) => {
        resolve(res.data)
      },
      fail: reject,
      complete() {
        ajaxCount--
        if(ajaxCount == 0){
        wx.hideLoading()
        }
      }
    })
  })
}

export default request