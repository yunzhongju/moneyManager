// pages/home/components/header/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    income: String,
    expenditure: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    currentDate: new Date().getTime(),
    year: 0,
    month: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick() {
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
      this.triggerEvent("dateeven", event.detail)
      this.setData({
        currentDate: event.detail,
        show: false
      });
      this.getYear()
      this.getMonth()
    },
    getYear() {
      var that = this
      var date = new Date(that.data.currentDate)
      this.setData({
        year: date.getFullYear()
      })
    },
    getMonth() {
      var that = this
      var date = new Date(that.data.currentDate)
      this.setData({
        month: date.getMonth() + 1
      })
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.getYear()
      this.getMonth()
    },
  }
})