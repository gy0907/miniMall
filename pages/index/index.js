//Page Object
import { 
  getBannerData,
  getCatitems,
  getFloorList
 } from '../../network/home'
Page({
  data: {
    BannerList: [],
    CatitemsList: [],
    FloorList: []
  },
  //options(Object)
  onLoad: function(options) {
    // 获取轮播图数据
    getBannerData().then(res => {
      this.setData({
        BannerList: res.message
      })
    })

    // 获取首页分类数据
    getCatitems().then(res => {
      this.setData( {
        CatitemsList: res.message
      })
    })

    // 获取楼层数据
    getFloorList().then(res => {
      this.setData({
        FloorList: res.message
      })
    })
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  