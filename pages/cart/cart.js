// pages/cart/cart.js
var util = require("../../utils/util.js")
var domain = util.domain
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    selectedAll: false,
    price: 0
  },

  getCart() {
    wx.showLoading({
      title: "加载中",
    })
    wx.request({
      url: domain+"getCart/session/"+app.globalData.session,
      success: (res)=>{
        console.log("cart", res)
        this.setData({
          products: res.data
        },()=>{
          this.totalPrice()
          this.selectedAll()
        })
      },
      complete: ()=>{
        wx.hideLoading()
      }
    })
  },

  totalPrice() {
    wx.request({
      url: domain+"totalPrice/session/"+app.globalData.session,
      success: (res)=>{
        console.log('price', res)
        this.setData({
          price: res.data[0].price*100
        })
      }
    })
  },

  setCount(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.request({
      url: domain+"setCount/id/"+id+"/count/"+e.detail+"/session/"+app.globalData.session,
      success: (res)=>{
        if(res){
          this.getCart()
        }
      }
    })
  },

  deleteProduct(e) {
    console.log(e)
    var {position, instance} = e.detail
    switch(position){
      case 'cell':
        instance.close()
        break
      case 'right':
        let id = e.currentTarget.dataset.id
        wx.showModal({
          title: "提示",
          content: "确定删除吗？",
          success: (res)=>{
            if(res.confirm){
              wx.request({
                url: domain+"deleteProduct/id/"+id+"/session/"+app.globalData.session,
                success: (res)=>{
                  if (res) {
                    this.getCart()
                  }
                }
              })
            }
          },
        })
        break
    }
  },

  changeSelect(e) {
    console.log(e)
    let id = (e.currentTarget.dataset.id == 'all')?e.detail:e.currentTarget.dataset.id
    wx.request({
      url: domain+"changeSelect/id/"+id+"/session/"+app.globalData.session,
      success: (res)=>{
        console.log(res)
        if(res){
          this.getCart()
        }
      },
    })
  },

  selectedAll() {
    for(let i=0;i<this.data.products.length;i++){
      if(this.data.products[i].selected==0){
        this.setData({
          selectedAll: false
        })
        break
      } else if(i==this.data.products.length-1){
        this.setData({
          selectedAll: true
        })
      }
    }
  },

  purchase() {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: domain+"purchaseSelected/session/"+app.globalData.session,
      success: (res)=>{
        wx.hideLoading()
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
          this.getCart()
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
        } else if(res.data==20002){
          wx.showModal({
            title: "提示",
            content: "未选中任何商品",
            showCancel: false
          })
        }
      }
    })
  },

  loginCaution() {
    wx.showModal({
      title: "提示",
      content: "请先登录再使用相关功能",
      confirmText: "前往登录",
      cancelText: "返回首页",
      success: (res)=>{
        if(res.confirm){
          wx.switchTab({
            url: "../user/user",
          })
        } else if(res.cancel) {
          wx.switchTab({
            url: "../home/home",
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
    if(!app.globalData.session){
      that.setData({
        products: [],
        selectedAll: false,
        price: 0
      })
      that.loginCaution()
    } else {
      that.getCart()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.request({
      url: domain+"changeSelect/id/false/session/"+app.globalData.session,
      success: (res)=>{
        console.log(res)
        if(res){
          this.getCart()
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    if(!app.globalData.session){
      that.setData({
        products: [],
        selectedAll: false,
        price: 0
      })
      that.loginCaution()
    } else {
      that.getCart()
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