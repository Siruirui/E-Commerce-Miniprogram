// pages/charge/charge.js
var util = require("../../utils/util.js")
var domain = util.domain
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0
  },

  charge(e) {
    console.log(e)
    wx.request({
      url: domain+"chargeBalance/chargeAmount/"+e.detail.value.amount+"/session/"+app.globalData.session,
      success: (res)=>{
        console.log(res)
        if(res.data){
          this.getBalance()
          wx.showModal({
            title: "提示",
            content: "充值成功",
            confirmText: "继续充值",
            cancelText: "返回",
            success: (res)=>{
              if(res.cancel){
                wx.navigateBack({
                  delta: 1,
                })
              }
            }
          })
        } else {

        }
      }
    })
  },

  getBalance(){
    wx.request({
      url: domain+"getBalance/session/"+app.globalData.session,
      success: (res)=>{
        if(res.data.length){
          this.setData({
            balance: res.data[0].balance
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    that.getBalance()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    that.getBalance()
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