const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
const Router = require("../../router/Router")
const validate = require("../../validate/index.js")

var base64 = require("../../images/base64");
Page({
  data: {
    list: [
      {
        id: 'nav',
        name: '监督好友申请',
        open: false,
        pages: ['navigation-bar', 'tabbar'],
        slideButtons: [{
          type: 'warn',
          text: '删除',
          extClass: 'test',
          src: '../../images/icon_del.svg', // icon的路径
        }]
      },
      {
        id: 'widget',
        name: '我的监督好友',
        open: false,
        pages: [],
        slideButtons: [{
          type: 'warn',
          text: '删除',
          extClass: 'test',
          src: '../../images/icon_del.svg', // icon的路径
        }]
      }
    ]
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },


  onLoad: function () {
    this.setData({
     
    });
    let requestData = {
      url: ApiConst.getRelatedUser,
      data: {
        status: null
      }
    }
    ApiManager.send(requestData, 'GET').then(res => {
      
      
    })
  }
});