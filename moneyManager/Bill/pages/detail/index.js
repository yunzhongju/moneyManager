// pages/detail/index.js
import Dialog from '../../dist/dialog/dialog';
import requests from "../../server/network.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    data: '',
    isshow: false,
    money: "",
    desc: "",
    account: {},
    type: {}
  },
  onEdit() {
    this.setData({
      isshow: true
    })
  },
  onDelete(e) {
    var id = e.currentTarget.dataset.id
    this.setData({
      show: true
    })
    Dialog.confirm({
        context: this,
        title: '标题',
        message: '弹窗内容',
      })
      .then(() => {
        // on confirm
        requests({
          url: `/delete?id=${id}`
        }).then(res => {
          wx.reLaunch({
            url: '../home/index',
          })
        })
      })
      .catch(() => {
        // on cancel
      });
  },

  handleCanle() {
    this.setData({
      isshow: false
    })
  },
  handleSure() {
    var id = this.data.account.id
    var money = this.data.money
    var desc = this.data.desc
    // debugger
    requests({
      url: `/edit?id=${id}&money=${money}&desc=${desc}`
    }).then(res => {
      console.log(res.data)
      this.setData({
        isshow: false,
        account: res.data
      })
    })
  },
  handleMoney(value) {
    this.setData({
      money: value.detail
    })
  },
  handleDesc(value) {
    this.setData({
      desc: value.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var aid = options.aid;
    requests({
      url: `/detail?aid=${aid}`
    }).then(res => {
      console.log(res.data)
      this.setData({
        account: res.data.data.account,
        type: res.data.data.type
      })
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

  }
})