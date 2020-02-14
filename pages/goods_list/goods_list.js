// pages/goods_list/goods_list.js
import {getGoodsList} from "../../network/goods_list"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabControlIndex: 0,
    goodsList: [],
    noImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581487017787&di=db8abcff58e17e5f09cd43e61ca8523f&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F55%2F70%2F594c83ce7e5b3_610.jpg",
    total: 0 
  },
  // 接口需要的参数 新知识！！！
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 将cid保存到请求参数中
    this.QueryParams.cid = options.cid
    // 请求数据
    this._getGoodsList(this.QueryParams)
  },
  _getGoodsList(o) {
    getGoodsList(o).then(res => {
      this.data.total = res.message.total
      const goodsList = this.data.goodsList
      goodsList.push(...res.message.goods)
      this.setData({
        goodsList
      })
      // 关闭下拉刷新的窗口
      wx.stopPullDownRefresh()
    })
  },
  // tab栏的点击事件
  tabControlClick(data) {
    const {index} = data.detail
    this.setData({
      tabControlIndex: index
    })
  },
  // 页面触底上拉加载更多
  onReachBottom() {
    // 先判断还有没有下一页
    this.QueryParams.pagenum++
    if(this.QueryParams.pagenum <= Math.ceil(this.data.total / this.QueryParams.pagesize)) {
      // 没注意这里的参数只能传递 QueryParams 耽误了一些时间
      this._getGoodsList(this.QueryParams)
      console.log(this.QueryParams.pagenum)
    } else {
      wx.showToast({
        title: '没有下一页了',
        icon: 'none'
      })
    }
  },
  // 页面下拉刷新
  onPullDownRefresh() {
    // 1.将页码重置为0
    this.QueryParams.pagenum = 1
    // 2.将goodsList清空
    this.data.goodsList = []
    // 3.重新请求数据
    this._getGoodsList(this.QueryParams)
  }
})