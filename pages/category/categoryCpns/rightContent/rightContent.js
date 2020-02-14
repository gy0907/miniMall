// pages/category/categoryCpns/rightContent/rightContent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rightContent: {
      type: Array,
      // 监听数据改变时触发
      observer: function() {
        this.setData({
          scrollTop: 0
        })
      }
    },
    rightIndex: {
      type: Number,
      default: 3
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollTop: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
