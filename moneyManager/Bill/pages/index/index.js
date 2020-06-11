//index.js
//获取应用实例
const app = getApp()
import Toast from "../../dist/toast/toast.js"
import requests from "../../server/network.js"
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    info: ''
  },
  getData(uid) {
    requests({
      url: `/total?id=${uid}`
    }).then(res => {
      console.log(res.data)
      this.setData({
        info: res.data
      })
    })
  },
  quit() {
    app.globalData.userId = null
    Toast.success('成功退出');
    setTimeout(function() {
      wx.navigateTo({
        url: '../login/index',
      })
    }, 1000)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.getData(app.globalData.userId)
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              js_code: res.code,
              appid: "",
              grant_type: "authorization_code",
              secret: ""

            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})