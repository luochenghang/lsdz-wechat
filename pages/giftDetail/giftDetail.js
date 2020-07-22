const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
let util = require('../../utils/util.js')

Page({

  data: {
    form: []
  },

  onLoad: function(options) {
   
    this.getGiftDetail(options.id)
  },
  getGiftDetail(id) {
    let requestData = {
      url: ApiConst.getGiftById,
      data: {
        id: id
      }
    }
    ApiManager.send(requestData, 'GET').then(res => {
      this.setData({
        form: res.data.data
      })
    })
  }

});