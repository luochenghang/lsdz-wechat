let app = getApp()
const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
const Router = require("../../router/Router")
let util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.wxLogin()
  },
  //微信登录
  wxLogin: function () {
    wx.login({
      success: (res) => {
        this.code = res.code
        this.getSetting()
      },
      fail: (res) => {
        console.log('login err:', res)
      }
    })
  },
  // 获取用户信息
  onGotUserInfo (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      let reqData = {
        code: this.code,
        nickName: e.detail.userInfo.nickName,
        portrait: e.detail.userInfo.avatarUrl,
        sex: e.detail.userInfo.gender,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      }
      this.sendLogin(reqData)
    }
  },
  // 获取微信授权信息
  getSetting: function () {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.getUserInfo()
        }
      }
    })
  },
  //微信用户信息授权
  getUserInfo() {
    var that = this;
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        app.globalData.userInfo = res.userInfo;
        // wx.redirectTo({
        //   url: Router.DRAWINGS
        // })
        that.sendLogin({
          code: this.code,
          nickName: res.userInfo.nickName,
          portrait: res.userInfo.avatarUrl,
          sex: res.userInfo.gender,
          encryptedData: res.encryptedData,
          iv: res.iv
        })
      },
      fail: function (res) {
      }
    })
  },
  sendLogin: function (data) {
    let requestData = {
      url: ApiConst.login,
      data: data
    }
    ApiManager.send(requestData, 'POST').then(res => {
      app.globalData.token = res.data.data.token
      wx.switchTab({
        url: '/pages/gift/gift'
      })
      
    })
  }

  
})