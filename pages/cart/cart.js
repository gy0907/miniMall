// pages/cart/cart.js
import {showToast} from "../../lib/show"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    address: {},
    addressFlag: false,
    allChecked: false,
    allCount: 0,
    allPrice: 0,
    showFlag: true
  },
  onShow () {
    // 每次打开页面刷新购物车数据
    const cartList = wx.getStorageSync("cartList");
    if(cartList) {
      this.setData({
        cartList: cartList
      })
    }
    // 检查本地存储中有没有数据
    // 有地址缓存的话显示收货地址信息 没有显示按钮
    const address = wx.getStorageSync("addressData");
    this.setData({
      address
    })

    // 判断底部栏的信息 全选 总价 商品数量
    this.setAllPrice()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 更改单个复选框状态
  checkboxChange(e) {
    const currentId = e.currentTarget.dataset.iid
    const currentItem = this.data.cartList.find(item => item.id == currentId)
    currentItem.checked = !currentItem.checked
    // 更新数据必须同时更新本地存储
    this.setData({
      cartList: this.data.cartList
    })
    wx.setStorageSync("cartList", this.data.cartList);

    // 点击按钮后要重新判断 底部合计栏
    this.setAllPrice()

  },
  setAllPrice() {
    console.log('判断总价格')
    // 判断总价格 数量 全选按钮状态
    let allChecked = true
    let allCount = 0
    let allPrice = 0
    this.data.cartList && this.data.cartList.forEach(item => {
        if(item.checked) {
          allPrice += item.price*item.count
          allCount++
      } else {
          allChecked = false
        }
      })
    if (this.data.cartList.length === 0) {
      allChecked = false
    }
    this.setData({
      allChecked,
      allCount,
      allPrice
    })
  },
  // 购物车修改数量
  add (id) {
    const currentId = id.currentTarget.dataset.id
    const currentItem = this.data.cartList.find(item => item.id == currentId)
    if(id.currentTarget.dataset.type == "add"){
      // 修改数据同时要更新本地存储
      currentItem.count += 1
      wx.setStorageSync('cartList', this.data.cartList);
    } else {
      if(currentItem.count > 1){
        currentItem.count -= 1
      } else {
        showToast('至少保留一件商品');
      }
    }
    // 发现这种方式可以刷新数据 美滋滋
    this.setData({
      cartList: this.data.cartList
    })
    // 点击按钮后要重新判断 底部合计栏
    this.setAllPrice()
  },
  handleChooseAddress() {
    // 1.先获取授权状态 看看用户有没有拒绝过请求
    wx.getSetting({
      success: (result) => {
        const scopeAddress = result.authSetting["scope.address"]
        // 拒绝过请求就要执行openSetting重新打开权限
        !scopeAddress && wx.openSetting();
          wx.chooseAddress({
            success: (result) => {
              // 将地址存入本地缓存当中
              wx.setStorageSync("addressData", result);
            }
          });
      }     
    });
  },
  // 点击全选按钮后的事件 子组件传递过来的
  allCheckChange() {
    let allChecked = !this.data.allChecked
    if(!allChecked) {
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        allCount: 0,
        allPrice: 0
      })
    } else {
      // 所有选框为true
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      allChecked = true
    }
    // 重新更新数据
    this.setData({
      allChecked,
      cartList: this.data.cartList
    })
    // 同步更新本地缓存
    wx.setStorageSync("cartList", this.data.cartList);
    // 点击按钮后要重新判断 底部合计栏
    this.setAllPrice()
  },
  // 长按删除条目事件
  longTapItem() {
    this.setData({
      showFlag: false
    })
  },
  // 点击了取消或删除按钮
  clickCancel(data) {
    const type = data.detail.type

    if(type == "cancel") {
      this.setData({
        showFlag: true
      })
    } else if(type == "delete" && this.data.allCount >= 1){
      // 这表示用户点击了删除按钮
      wx.showModal({
        title: '确定删除这'+this.data.allCount+'项？',
        content: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            // 返回所有没被选中的数组
            const cartList = this.data.cartList.filter(item => !item.checked)
            this.setData({
              cartList
            })
            // 同步更新本地缓存
            wx.setStorageSync("cartList", this.data.cartList);
            // 点击按钮后要重新判断 底部合计栏
            this.setAllPrice()
            // 弹框提示
            showToast('已删除');
              this.setData({
                showFlag: true
              })
          } else {
            showToast('已取消');
          }
        }
      });
    } else {
      showToast('请至少选择一项');
    }
  },
  // 点击了去结算
  clickBuy() {
    const {address} = this.data
    const {allCount} = this.data
    if(address.userName && allCount > 0) {
      wx.navigateTo({
        url: '/pages/pay/pay'
      });
    } else if(address.userName && allCount == 0){
      showToast('至少选择一件商品')
    } else {
      showToast('请先设置收货地址')
    }
  }
})