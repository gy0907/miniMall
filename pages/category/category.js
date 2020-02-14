// pages/category/category.js
import { getCategoryData } from "../../network/category"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CategoryList: [],
    leftMenuList: [],
    rightContent: [],
    menuIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 先判断本地存储中有没有旧数据 如果有，就使用旧数据 没有就重新发送请求
    // {time: Date.now(), data:{...}}

    // 1.获取本地存储中的数据
    const CategoryData = wx.getStorageSync("CategoryData");
    if(!CategoryData) {
      // 没有数据就要重新请求数据
      this._getCategoryData()
      console.log('新数据')
    } else {
      // 有数据的话先判断有没有过期 
      if(Date.now() - CategoryData.time > 6000 * 10) {
        this._getCategoryData()
        console.log("过期了")
      } else {
        console.log('用旧数据')
        this.setData({
          CategoryList: CategoryData.data
        })
        // 获取数据之后开始调用数据分类函数 把数据存入不同的变量
        this.setLeftData()
      }
     
    }
  },
  _getCategoryData(){
    getCategoryData().then(res => {
      this.setData({
        CategoryList: res.message
      })
      // 获取数据之后开始调用数据分类函数 把数据存入不同的变量
      this.setLeftData()
      // 然后将数据存入本地存储
      wx.setStorageSync("CategoryData", {time: Date.now(), data: res.message});
    })
  },
  setLeftData() {
    const arr = this.data.CategoryList.map(item => item.cat_name)
    const rightArr = this.data.CategoryList.map(item => item.children)

      this.setData({
        leftMenuList: arr,
        rightContent: rightArr
    })
  },
  // 左侧菜单点击事件发送的事件监听 控制右侧数据显示
  menuEvent(data) {
    this.setData({
      menuIndex: data.detail.index,
    })
  }
})