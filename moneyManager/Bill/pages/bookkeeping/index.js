// pages/bookkeeping/index.js
import requests from "../../server/network.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typelist: [{
      "id": 1,
      "name": "支出"
    }, {
      "id": 0,
      "name": "收入"
    }],
    isactive: 1,
    show: false,
    list: [],
    categray: '',
    money: "",
    desc: "",
    typeid: 0,
    id: 0,
    info: {}
  },
  onClick(event) {
    var id = event.currentTarget.dataset.id
    if (id == 0) {
      this.setData({
        isactive: id,
        list: this.data.categray.income
      })
    } else {
      this.setData({
        isactive: id,
        list: this.data.categray.outcome
      })
    }
  },
  onClickShow(e) {
    console.log(e)
    this.setData({
      show: true,
      id: e.currentTarget.dataset.id
    });
  },
  onCanlce() {
    this.setData({
      show: false
    });
  },
  onComfirm() {
    var info = {
      money: this.data.money,
      desc: this.data.desc,
      typeid: this.data.isactive,
      id: this.data.id
    }
    requests({
      url: `/addaccount`,
      method: "post",
      data: {
        id: info.id,
        money: info.money,
        typeid: info.typeid,
        desc: info.desc,
        userid: app.globalData.userId
      }
    }).then(res => {
      this.setData({
        money: "",
        desc: "",
        show: false
      });
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
    requests({
      url: `/categrays`
    }).then(res => {
      console.log(res.data)
      this.setData({
        list: res.data.outcome,
        categray: res.data
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