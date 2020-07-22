// components/navbar/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "标题"
    },
    hasback: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.statusBarHeight + 'px',
    navigationBarHeight: (app.statusBarHeight + 44) + 'px'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 返回上一页
    _goBack: function () {
      console.log(123)
      return
      wx.navigateBack({
        delta: 1
      })
    },
  }
})
