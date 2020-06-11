// pages/bill/index.js
import requests from "../../server/network.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    currentDate: new Date().getTime(),
    year: 0,
    bill: {}
  },
  onClick() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onSure(event) {
    console.log(event.detail)
    this.getBill(event.detail)
    this.setData({
      currentDate: event.detail,
      show: false
    });
    this.getYear()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getYear()
    this.getBill(this.data.currentDate)
  },
  getBill(t) {
    requests({
      url: `/bill?t=${t}&userid=${app.globalData.userId}`
    }).then(res => {
      console.log(res.data)
      if (res.data != {}) {
        this.setData({
          bill: res.data
        })
      } else {
        this.setData({
          bill: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getYear() {
    var that = this
    var date = new Date(that.data.currentDate)
    this.setData({
      year: date.getFullYear()
    })
  },
})