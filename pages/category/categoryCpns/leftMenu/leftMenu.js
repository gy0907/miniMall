// pages/category/categoryCpns/leftMenu/leftMenu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    MenuList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    menuItemClick(data) {
      const index = data.currentTarget.dataset.index
      this.setData({
        activeIndex: index
      })
      this.triggerEvent('menuClick', {index})
    }
  }
})
