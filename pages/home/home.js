// pages/home/home.js
var util = require("../../utils/util.js")
var domain = util.domain

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    type: 's',
    item: []
  },

  getBanner() {
    wx.request({
      url: domain+"getBanner",
      success: (res)=>{
        console.log(res)
        this.setData({
          banner: res.data
        })
      }
    })
  },

  onChange(e) {
    console.log(e)
    let t = e.detail
    this.setData({
      type: t==0?'s':t==1?'f':t==2?'m':t==3?'c':null
    },()=>{
      this.getProductsByType()
    })
  },

  getProductsByType() {
    wx.request({
      url: domain+"getProductsBy/type/"+this.data.type,
      success: (res)=>{
        console.log(res)
        this.setData({
          item: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    that.getProductsByType()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this
    that.getBanner()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    that.getProductsByType()
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