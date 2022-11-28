// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var session =wx.getStorageSync('SESSION')
    var expiredTime =wx.getStorageSync('EXPIREDTIME')
    var now = +new Date()

    if (now - expiredTime <=1*24*60*60*1000) {
      this.globalData.session = session
      this.globalData.expiredTime = now + 1*24*60*60*1000
      wx.setStorageSync('EXPIREDTIME', this.globalData.expiredTime)
    } else {
      wx.clearStorageSync()
    }

    // 登录
    // wx.login({
      // success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // }
    // })
  },
  globalData: {
    // userInfo: null,
    session: null,
    expiredTime: 0
  }
})
