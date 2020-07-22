const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
let util = require('../../utils/util.js')

let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    moreBtn: false, //正在载入更多提示
    noMoreBtn: false, //没有更多提示
    goMore: true, // 加载更多
    searchText: '',
  
    params: {
      queryStr: '',
      curretnPage: 1,
      pageCount: 10
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  _addFrined: function(e) {
    
    let requestData = {
      url: ApiConst.addFrined,
      data: {
        relatedUserId: e.currentTarget.dataset.id
      }
    }
    ApiManager.send(requestData, 'POST').then(res => {
      let that = this
      if (res.data.code == 1000) {
        wx.showToast({
          title: '好友请求已发送,请耐心等待!',
          icon: 'none',
          duration: 2000,
        });

      }
    })

  },


  searchRequest(value) {

    this.setData({
      'params.queryStr': value.trim(),
      goMore: true,
      moreBtn: false,
      noMoreBtn: false
    })
    this.findFriend()
  },
  // 搜索确认事件
  search(ev) {
    this.searchRequest(ev.detail.value)
  },

  //列表 
  findFriend() {
    let that = this
    let requestData = {
      url: ApiConst.findFriend,
      data: this.data.params
    }
    ApiManager.send(requestData, 'GET').then(res => {
      if (that.data.params.curretnPage == 1) {
        that.setData({
          list: res.data.data.list
        })
      } else {
        if (that.data.list.length < res.data.data.totalCount) {
          let list = that.data.list
          list = list.concat(res.data.data.list)
          that.setData({
            list: list,
            goMore: true,
            moreBtn: false
          })
        } else {
          that.setData({
            goMore: false,
            moreBtn: false,
            noMoreBtn: true
          })
        }
      }
      if (!that.data.list.length) {
        this.setData({
          loadingTips: '抱歉，没有找到合适的好友'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.findFriend()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      'params.curretnPage': 1,
      goMore: true,
      moreBtn: false,
      noMoreBtn: false
    })
    this.findFriend()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this
    if (this.data.goMore) {
      this.setData({
        moreBtn: true,
        'params.curretnPage': that.data.params.curretnPage + 1,
        goMore: false
      })
      this.findFriend()
    }
  },

})