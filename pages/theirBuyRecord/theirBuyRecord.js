var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["全部", "需送礼", "不能送礼", "已完成"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,


    countries: ["小众众", "美国", "英国"],
    countryIndex: 0,

  },
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {

        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },


  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  }
});