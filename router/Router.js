export const index = '/pages/index/index'//封面
export const GIFT = '/pages/gift/gift'//礼物中心

/** 生成参数 */
export function joinPath(paramsObj) {
  const url = paramsObj.url;
  const params = paramsObj.params;
  if (typeof params === 'object') {
    const keys = Object.keys(params);
    if (keys && keys.length) {
      const path = keys.reduce((url, key) => {
        return `${url}${key}=${params[key]}&`;
      }, `${url}?`)
      return path.substring(0, path.length - 1);
    } else {
      return url;
    }
  }
  console.log(url)
  return url;
}
