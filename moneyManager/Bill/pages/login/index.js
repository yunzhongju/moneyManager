// pages/login/index.js
const app = getApp()
import requests from "../../server/network.js"
import Toast from "../../dist/toast/toast.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    msg: ''
  },
  handleUsername(value) {
    this.setData({
      username: value.detail
    })
  },
  handlePassword(value) {
    this.setData({
      password: value.detail
    })
  },
  register() {
    wx.navigateTo({
      url: '../register/index',
    })
  },
  login() {
    var username = this.data.username;
    var pwd = this.data.password;
    requests({
      url: `/login?username=${username}&pwd=${pwd}`
    }).then(res => {
      console.log(res.data)
      if (res.data.id) {
        app.globalData.userId = res.data.id
        Toast.success('登录成功');
        // wx.reLaunch({
        //   url: '../home/index',
        // })
        setTimeout(function() {
          wx.reLaunch({
            url: '../home/index',
          })
        }, 1000)
      } else {
        Toast.fail('用户名或密码错误');
        this.setData({
          username: '',
          password: ''
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  }
})