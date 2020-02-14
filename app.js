//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function(options) {
    
  },
  onShow: function(options) {

  },
  onHide: function() {

  },
  onError: function(msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function(options) {

  },
  globalData: {
    cartList: [],
    noImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581487017787&di=db8abcff58e17e5f09cd43e61ca8523f&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F55%2F70%2F594c83ce7e5b3_610.jpg",
  },
  addToCart(obj) {
    // 为防止购物车数据因为页面刷新而丢失
    // 需要先获取之前的旧数据 加入到globalData.cartList中
    this.globalData.cartList = wx.getStorageSync("cartList");
      
    // find找出数组里的旧数据加上1
    const oldInfo = this.globalData.cartList.find(item => item.id === obj.id) 
    if(oldInfo){
      oldInfo.count += 1
    } else {
      obj.count = 1
      obj.checked = false
      this.globalData.cartList.push(obj)
    }
    // 存入到本地存储
    wx.setStorageSync('cartList', this.globalData.cartList);
  }
});
  