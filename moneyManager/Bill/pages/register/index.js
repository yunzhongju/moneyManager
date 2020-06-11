// pages/register/index.js
import requests from "../../server/network.js"
import Toast from "../../dist/toast/toast.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    surepwd: "",
    username: '',
    password: ''
  },
  register() {
    if (this.data.password != this.data.surepwd) {
      Toast.fail('两次密码不一致');
      this.setData({
        password: '',
        surepwd: ''
      })
      return
    } else {
      requests({
        url: `/register`,
        method: "post",
        data: {
          username: this.data.username,
          pwd: this.data.surepwd
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.state == 0) {
          Toast.success('注册成功!');
          setTimeout(function() {
            wx.navigateTo({
              url: '../login/index',
            })
          }, 1000)
        } else {
          Toast.fail('该用户已存在!');
          this.setData({
            username: '',
            password: '',
            surepwd: ''
          })
        }
      })
    }
  },
  handleUsername(val) {
    this.setData({
      username: val.detail
    })
  },
  handlePassword(val) {
    this.setData({
      password: val.detail
    })
  },
  handleSurePassword(val) {
    this.setData({
      surepwd: val.detail
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