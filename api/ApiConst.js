let ApiManage = require("../api/ApiManage.js")
let baseUrl = ApiManage.ApiUrl.develop
export const login = baseUrl + "/api/v1/login"//登录接口
export const AllGift = baseUrl + "/api/v1/getAllGift"//获取礼物
export const addGift = baseUrl + "/api/v1/addGift"//添加礼物
export const delGift = baseUrl + "/api/v1/delGift"//删除礼物
export const auditGift = baseUrl + "/api/v1/auditGift"//审核礼物
export const getGiftById = baseUrl + "/api/v1/getGiftById"//获取礼物通过id

export const addTask = baseUrl + "/api/v1/addTask"//添加任务
export const delTask = baseUrl + "/api/v1/delTask"//删除任务
export const auditTask = baseUrl + "/api/v1/auditTask"//审核任务
export const getTaskById = baseUrl + "/api/v1/getTaskById"//获取礼物通过id

export const addFrined = baseUrl + "/api/v1/addFriend"//添加监督好友
export const findFriend = baseUrl + "/api/v1/findFriend"//查找好友
export const getRelatedUser = baseUrl + "/api/v1/getRelatedUser"//获取关联好友
export const delRelatedUser = baseUrl + "/api/v1/delRelatedUser"//删除关联好友
export const agreeApply = baseUrl + "/api/v1/agreeApply"//是否同意请求





