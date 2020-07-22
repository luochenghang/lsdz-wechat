let util = require('../utils/util.js')

let INTEGER_NEGATIVE = /^\+?[1-9][0-9]*$/;

let gift = function(form) { //添加礼物校验
  if (!form.title) {
    util.toast('请输入礼物标题')
  } else if (!form.content) {
    util.toast('请输入礼物描述')
  } else if (!form.coins) {
    util.toast('请输入金币')
  } else if (!INTEGER_NEGATIVE.test(form.coins)) {
    util.toast('请输入正确的金币数')
  } else if (!form.coverImg) {
    util.toast('请上传封面照片')
  } else {
    return true
  }
}

let task = function(form) { //添加任务校验
  if (!form.title) {
    util.toast('请输入任务标题')
  } else if (!form.content) {
    util.toast('请输入任务描')
  } else if (!form.rewardCoins) {
    util.toast('请输入获取金币数')
  } else if (!INTEGER_NEGATIVE.test(form.rewardCoins)) {
    util.toast('请输入正确的获取金币数')
  } else if (!form.punishCoins) {
    util.toast('请输入扣除金币数')
  } else if (!INTEGER_NEGATIVE.test(form.punishCoins)) {
    util.toast('请输入正确的扣除金币数')
  } else if (!form.coverImg) {
    util.toast('请上传封面图')
  } else {
    return true
  }
}

module.exports = {
  gift,
  task
}