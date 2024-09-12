// app.js
App({
  globalData: {
    events: [],
    eventIdCounter: 1
  },
  onLaunch() {
    // 展示本地存储能力
    wx.getStorage({
      key: 'events',
      success: (res) => {
        let events = res.data || [];
        console.log(events)
        // 处理没有id的事件，分配自增的id
        events = events.map(event => {
          if (event && !event.id) {
            event.id = this.globalData.eventIdCounter++;
          }
          return event;
        });

        // 更新 globalData 和本地存储
        this.globalData.events = events;
        const eventSize = res.data.length > 0 ? Math.max(...res.data.map(e => e.id)) : 0;
        this.globalData.eventIdCounter = eventSize + 1
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
