import {getGoodsDetail} from "../../network/goods_detail"

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetailObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getGoodsDetail(options)
  },
  _getGoodsDetail (o) {
    getGoodsDetail(o).then(res => {
      console.log(res.message)
      this.setData({
        goodsDetailObj: {
          id: res.message.goods_id,
          pics: res.message.pics,
          goods_price: res.message.goods_price,
          goods_name: res.message.goods_name,
          goods_introduce: res.message.goods_introduce.replace(/\.webp/g,'.jpg')
        }
      })
    })
  },
  // 点击添加购物车功能
  addCart() {
    // 需要添加到购物车的信息有 商品缩略图 商品标题 商品价格 商品id
    const goods = {}
    goods.id = this.data.goodsDetailObj.id
    // 判断有没有图片
    if(this.data.goodsDetailObj.pics.length !== 0) {
      goods.pic = this.data.goodsDetailObj.pics[0].pics_sma
    } else {
      goods.pic = app.globalData.noImage
    }
    goods.price = this.data.goodsDetailObj.goods_price
    goods.title = this.data.goodsDetailObj.goods_name

    // 加入到购物车
    app.addToCart(goods)

    // 加入成功提示
    wx.showToast({
      title: '加入购物车成功'
    });
      
  }
})