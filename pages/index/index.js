Page({
  data: {
    msg: "Click Me",
    loading: false
  },

  onLoad: function() {
    wx.showToast({
      title: '已发送',
      icon: 'success',
      duration: 1500
    })
  },

  switchTab: function(e) {
    wx.switchTab({
      url: 'pages/wxml/index',
    })
  },
  convertLoadingToFalse: function(e) {
    console.log("convert loading to false entered")
    this.setData({loading: false})
  },
  onPullDownRefresh: function(e) {
    wx.showToast({
      title: '正在刷新'
    })
    this.setData({
      msg: "Welcome back"
    })
  },

  tap: function(e) {
    this.setData({
      loading: true
    })
    setTimeout(() => this.convertLoadingToFalse(), 5000)
  },
  tapName: function(e) {
    console.log(e)
    this.setData(
      {msg: "Clicked!"})
      console.log("switch accessed")
      console.log("system: " + wx.getSystemSetting())
      console.log(wx.canIUse('getSystemSetting'))
      wx.showModal({
        title: '提示',
        content: '李博是个傻瓜蛋',
        complete: (res) => {
          if (res.cancel) {
            this.setData({
              msg: "取消了也是傻瓜蛋"
            })
          }
      
          if (res.confirm) {
            wx.showModal({
              title: '提示',
              content: '恭喜您，已确认是个傻瓜蛋',
              complete: (res) => {
                if (res.cancel) {
                  
                }
            
                if (res.confirm) {
                  
                }
              }
            })
          }
        }
      })
  },
  onReachBottom: function(e) {
    wx.showModal({
      title: '触底了',
      content: '你已经触底了',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          
        }
      }
    })
  }
})