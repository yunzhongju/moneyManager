const BaseUrl = "http://124.70.165.118"
export default function(config) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BaseUrl + config.url,
      method: config.method || "get",
      success: resolve,
      fail: reject,
      data: config.data
    })
  })
}