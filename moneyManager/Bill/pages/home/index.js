// pages/home/index.js
import requests from "../../server/network.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    income: 0,
    expenditure: 0,
    currentDate: new Date().getTime(),
    isLoad: false
    // income_sum: 0,
    // outcome: 0
  },
  headerClick(e) {
    this.setData({
      currentDate: e.detail
    })
    this.getHome(e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.userId)
    this.getHome(this.data.currentDate)
  },
  getHome(t) {
    requests({
      url: `/accounts?t=${t}&id=${app.globalData.userId}`
    }).then(res => {
      // console.log(res.data)
      if (res.data.data.length != 0) {
        this.setData({
          income: res.data.data[0].income_sum,
          expenditure: res.data.data[0].outcome_sum,
          list: res.data.data.reverse()
        })
      } else {
        this.setData({
          income: 0,
          expenditure: 0,
          list: []
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
  setLoad() {
    this.setData({
      isLoad: false
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      isLoad: true
    })
    this.getHome(this.data.currentDate)
    console.log(this)
    setTimeout(this.setLoad, 1000)
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

  }
})