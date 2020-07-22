const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
const Router = require("../../router/Router")
const validate = require("../../validate/index.js")

Page({

  data: {

    forMeToDo: false,
    levelStr: ["一般", "紧急", "加急"],
    level: 0,
    form: {
      level: 0,
      endDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      title: '',
      coverImg: 'https://oss.benpaobao.com//orange_Img/2019/12/11/a5e9a1e0c3d74fedb16e975dc2542ffd.png',
      content: '',
      rewardCoins: '',
      punishCoins: '',
      isForMe: 0
    }

  },
  onLoad: function(options) {
    this.setData({
      'form.isForMe': options.isForMe
    })
    if(options.isForMe == 1){
      this.setData({
        forMeToDo: true
      }) 
    }
  },

  bindlevel: function(e) {
    this.setData({
      'form.level': e.detail.value
    })
  },
  bindendDate: function (e) {
    this.setData({
      'form.endDate': e.detail.value
    })
  },
  bindtitle: function (e) {
    this.setData({
      'form.title': e.detail.value
    })
  },
  bindcontent: function (e) {
    this.setData({
      'form.content': e.detail.value
    })
  },
  bindrewardCoins: function (e) {
    this.setData({
      'form.rewardCoins': e.detail.value
    })
  },
  bindpunishCoins: function (e) {
    this.setData({
      'form.punishCoins': e.detail.value
    })
  },


  onSubmit() {
    if (validate.task(this.data.form)) {
      let requestData = {
        url: ApiConst.addTask,
        data: this.data.form
      }
      wx.showModal({
        title: '设计任务',
        content: '您确定添加该任务吗?',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {

          if (res.confirm) {
            console.log('用户点击主操作')
            ApiManager.send(requestData, 'POST').then(res => {
              let that = this
              if (res.data.code == 1000) {
                wx.showToast({
                  title: '添加任务已完成，快去叫你的监督人去审核吧，请耐心等待!',
                  icon: 'none',
                  duration: 3000,
                });

                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 3000)
              }
            })
          }
        }
      });

    }
  },

/**
 * 可以先使用临时文件来显示,然后点击确认的时候将图片上传上去
 */


  //调用微信从本地相册或拍照 
  chooseImage() {
    let that = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: res => {
        // success
        let tempFilePaths = res.tempFilePaths;
        let paramsObj = {
          url: Router.UPLOAD,
          params: {
            type: 'tech',
            src: tempFilePaths[0],
            callBack: 'requestPreUpload'
          }
        }
        wx.navigateTo({
          url: Router.joinPath(paramsObj)
        })
      }
    })
  },
  //请求后端返回相关字段
  requestPreUpload(img) {
    let that = this
    let requestData = {
      url: 'https://dev.benpaobao.com/common/v1/file/sign',
      data: {
        fileFolderName: util.carImg,
        fileName: img
      }
    }
    ApiManager.send(requestData, 'GET').then(res => {
      this.uploadFileToOss(res, img)
    })
  },
  // 上传图片或者视频文件到阿里云
  uploadFileToOss(result, img) {
    let type = this.type
    let that = this
    let formData = {
      key: result.data.data.key,
      policy: result.data.data.policy,
      OSSAccessKeyId: result.data.data.OSSAccessKeyId,
      success_action_status: result.data.data.success_action_status,
      signature: result.data.data.signature
    };
    wx.showLoading({
      title: '上传中...'
    })
    wx.uploadFile({
      url: result.data.data.host,
      filePath: img,
      name: 'file', // name必须是file
      formData: formData,
      success: res => {
        if (res.statusCode == 200) {
          that.setData({
            'form.coverImg': `${result.data.data.host}/${result.data.data.showKey}`
          })
        }
      },
      fail: res => {
        util.loginTip('文件上传失败，请重试\n\r~~~~(>_<)~~~~')
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
});