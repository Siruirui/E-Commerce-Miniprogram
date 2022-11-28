// pages/user/user.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
var userInfo = {avatarUrl:defaultAvatarUrl, nickName:"微信用户"}
var util = require('../../utils/util.js')
var domain = util.domain
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    balance: 0,
    userInfo: {avatarUrl:defaultAvatarUrl, nickName:"微信用户"}
  },

  tapLogin() {
    this.getSession().then((session)=>{
      app.globalData.session = session
      var now = +new Date()
      var expiredTime = now + 1*24*60*60*1000
      wx.setStorageSync('SESSION', session)
      wx.setStorageSync('EXPIREDTIME', expiredTime)
      this.setData({
        isLogin: Boolean(app.globalData.session)
      })
    }).then(()=>{
      this.getNickName()
      this.getBalance()
      console.log(this.data.userInfo)
    })
  },

  getSession() {
    return new Promise((resolve, reject)=>{
      wx.login({
        success: (res)=>{
          console.log(res)
          if (res.code) {
            wx.request({
              url: domain + "getSession/code/" + res.code,
              success: (res)=>{
                // 登录成功
                if (res.statusCode === 200) {
                  console.log(res)// 服务器回包内容
                  resolve(res.data)
                }
              },
            })
          } else {
            console.log('获取用户登录态失败！')
            reject(res.errMsg)
          }
        }
      })
    })
  },

  getBalance(){
    wx.request({
      url: domain+"getBalance/session/"+app.globalData.session,
      success: (res)=>{
        if(res.data.length){
          this.setData({
            balance: res.data[0].balance
          },()=>{
            console.log("余额",this.data.balance)
          })
        }
      }
    })
  },

  getNickName() {
    wx.request({
      url: domain+"getNickName/session/"+app.globalData.session,
      success: (res)=>{
        console.log(res)
        if(res.data){
          this.setData({
            "userInfo.nickName": res.data
          },()=>{
            wx.setStorageSync('USERINFO', this.data.userInfo)
          })
        } else {
          this.setData({
            "userInfo.nickName": "微信用户"
          })
        }
      }
    })
  },

  onChooseAvatar(e) {
    const avatarUrl = e.detail.avatarUrl
    this.setData({
      "userInfo.avatarUrl": avatarUrl
    },()=>{
      wx.setStorageSync('USERINFO', this.data.userInfo)
    })
  },

  goToOrder() {
    if(app.globalData.session) {
      wx.navigateTo({
        url: "../order/order",
      })
    } else {
      wx.showModal({
        title: "提示",
        content: "请先登录再使用相关功能",
        confirmText: "前往登录",
        success: (res)=>{
          if(res.confirm) {
            this.tapLogin()
          } else if(res.cancel) {
            console.log("用户点击取消")
          }
        }
      })
    }
  },

  goToAbout() {
    wx.navigateTo({
      url: '../cservice/cservice',
    })
  },

  goToSetting() {
    wx.navigateTo({
      url: '../cservice/cservice',
    })
  },

  goToUserCenter() {
    wx.navigateTo({
      url: "../usercenter/usercenter",
    })
  },

  goToCharge() {
    wx.navigateTo({
      url: "../charge/charge",
    })
  },

  tapLogout() {
    app.globalData.session = null
    this.setData({
      isLogin: Boolean(app.globalData.session),
      userInfo: userInfo
    },()=>{
      wx.clearStorageSync()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    if(app.globalData.session){
      that.getNickName()
      that.getBalance()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this
    if(app.globalData.session) {
      that.setData({
        isLogin: true,
        userInfo: wx.getStorageSync('USERINFO')
      })
      that.getNickName()
      that.getBalance()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    if(app.globalData.session){
      that.getNickName()
      that.getBalance()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})