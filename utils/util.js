const toast = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none'
  })
}
const loginTip = (msg) => {
  wx.showModal({
    title: '提示',
    showCancel: false,
    content: msg,
    confirmColor: '#FFB000',
    success: function (res) {

    }
  })
}


const carImg = 'orange_Img'
const screenAudit = 'screen_audit'

/**
 * 获取系统信息同步方法
 */
function getSystemInfoSync() {
  return new Promise(resolve => {
    try {
      const res = wx.getSystemInfoSync();
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
}


module.exports = {
  loginTip,
  toast,
  carImg,
  getSystemInfoSync
}