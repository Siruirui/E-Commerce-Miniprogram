// pages/detail/detail.js
var util = require("../../utils/util.js")
var domain = util.domain
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {}
  },

  addToCart() {
    if(app.globalData.session){
      wx.request({
        url: domain+"addToCart/id/"+this.data.product.product_id+"/session/"+app.globalData.session,
        success: (res)=>{
          if(res){
            wx.showToast({
              title: "添加成功",
            })
          }
        }
      })
    } else {
      this.loginCaution()
    }
  },

  goToService() {
    wx.navigateTo({
      url: '../cservice/cservice',
    })
  },

  goToHome() {
    wx.switchTab({
      url: "../home/home",
    })
  },

  goToCart() {
    wx.switchTab({
      url: "../cart/cart",
    })
  },

  purchaseItem() {
    if(app.globalData.session){
      wx.request({
        url: domain+"purchaseItem/id/"+this.data.product.product_id+"/session/"+app.globalData.session,
        success: (res)=>{
          if(res.data==20000){
            wx.showModal({
              title: "提示",
              content: "购买成功",
              confirmText: "查看订单",
              cancelText: "返回",
              success: (res)=>{
                if(res.confirm){
                  wx.navigateTo({
                    url: "../order/order",
                  })
                }
              }
            })
          } else if(res.data==20001){
            wx.showModal({
              title: "提示",
              content: "余额不足，购买失败",
              confirmText: "前往充值",
              cancelText: "返回",
              success: (res)=>{
                if(res.confirm){
                  wx.navigateTo({
                    url: "../charge/charge",
                  })
                }
              }
            })
          }
        }
      })
    } else {
      this.loginCaution()
    }
  },

  loginCaution() {
    wx.showModal({
      title: "提示",
      content: "请先登录再使用相关功能",
      confirmText: "前往登录",
      success: (res)=>{
        if(res.confirm){
          wx.switchTab({
            url: "../user/user",
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: domain+"getProductsBy/id/"+options.id,
      success: (res)=>{
        console.log(res)
        this.setData({
          product: res.data[0]
        })
      }
    })
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