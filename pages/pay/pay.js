// pages/pay/pay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    address: {},
    allCount: 0,
    allPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取购物车 地址信息数据
    let cartList = wx.getStorageSync("cartList");
    cartList = cartList.filter(item => item.checked)

    const address = wx.getStorageSync("addressData");

    this.setData({
      cartList,
      address,
      allPrice: app.globalData.allPrice,
      allCount: app.globalData.allCount
    })
    console.log(this.data)
      
  },
  // 点击了结算功能(确认订单)
  handlePay() {
    // 1.先判断缓存中有没有token
    const token = wx.getStorageSync("token");
    // 2.判断
    if(!token) {
      // 没有token需要跳转页面获取token
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
    } else {

    }
  }
})