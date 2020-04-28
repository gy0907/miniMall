// pages/auth/auth.js
import { postWxLogin } from "../../network/auth"
import login from "../../lib/login"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUserInfo(e) {
    // 如果没有企业账号 这一步是无法成功的 我说他喵的怎么回事
    // 用户信息在获取用户信息之后就可以得到
    // code在登录之后可以得到
    // token好像是服务器那边还需要进行验证
    // 1.获取用户信息
    const {encryptedData,rawData,iv,signature} = e.detail
    // 2.获取小程序登陆成功后的code
    login().then(res => {
      console.log(res)
      const code = res.code
      const loginParams = { 
        encryptedData, 
        rawData, 
        iv, 
        signature,
        code
      }
      console.log(loginParams)
      // 在一个Promise中返回一个Promise是可以接着链式调用的
      return postWxLogin({method: 'post', data:loginParams})
    }).then(res => {
      console.log(res)
    })
  }
})