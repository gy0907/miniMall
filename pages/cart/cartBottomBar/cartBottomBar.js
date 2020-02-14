// pages/cart/cartBottomBar/cartBottomBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    allChecked: Boolean,
    allCount: Number,
    allPrice: Number,
    showFlag: Boolean
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
    bandleChange() {
      this.triggerEvent('allCheckChange', {},{})
    },
    clickCancel() {
      this.triggerEvent('clickCancel', {type: 'cancel'},{})
    },
    clickDelete() {
      this.triggerEvent('clickCancel', {type: 'delete'},{})
    },
    clickBuy() {
      this.triggerEvent('clickBuy', {},{})
    }
  }
})
