// pages/goods_detail/detailCpns/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    BannerList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击轮播图 放大预览
    handlePrevewImage(url) {
      const imageArr = this.data.BannerList.map(item => item.pics_big)
      wx.previewImage({
        current: url.currentTarget.dataset.url,
        urls: imageArr
      });
    }
  }
})
