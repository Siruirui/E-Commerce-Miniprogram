// pages/order/order.js
var util = require('../../utils/util.js')
var domain = util.domain
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: []
  },

  getOrder() {
    wx.request({
      url: domain+"getOrder/session/"+app.globalData.session,
      success: (res)=>{
        console.log("order", res)
        this.setData({
          order: res.data
        })
      }
    })
  },

  addToCart(e) {
    let id = e.currentTarget.dataset.id
    wx.request({
      url: domain+"addToCart/id/"+id+"/session/"+app.globalData.session,
      success: (res)=>{
        if(res){
          wx.showToast({
            title: "添加成功",
          })
        }
      }
    })
  },

  deleteOrder(e) {
    wx.showModal({
      title: "提示",
      content: "确定删除吗？",
      success: (res)=>{
        if(res.confirm){
          let id = e.currentTarget.dataset.id
          wx.request({
            url: domain+"deleteOrder/id/"+id+"/session/"+app.globalData.session,
            success: (res)=>{
              if(res){
                wx.showToast({
                  title: "删除成功",
                })
                this.getOrder()
              }
            }
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
    that.getOrder()
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
    that.getOrder()
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