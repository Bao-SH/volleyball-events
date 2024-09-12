// app.js
App({
  globalData: {
    events: []
  },
  onLaunch() {
    // 展示本地存储能力
    wx.getStorage({
      key: 'events',
      success: (res) => {
        console.log(res)
        this.globalData.events = res.data
      },
      fail: () => {
        this.globalData.events = []
      }
    })
  },
  onHide() {
    this.saveEventsToStorage()
  },
  onunload() {
    this.saveEventsToStorage()
  },
  saveEventsToStorage: function(e) {
    wx.setStorage({
      key: 'events',
      data: this.globalData.events
    })
  }

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  // },
})
