// pages/event/event.js
Page({

  /**
   * Page initial data
   */
  data: {
    events: [] 
  },
  createEvent: function(e) {
    wx.navigateTo({
      url: '/pages/newEvent/newEvent', // 指定要跳转的页面路径
    });
  },
  loadEvents: function() {
    const app = getApp();
    this.setData({
      events: app.globalData.events
    })
  },
  deleteEvent: function(e) {
    const index = e.currentTarget.dataset.index;
    const app = getApp();
    wx.showModal({
      title: '确认删除',
      content: '确定要删除此事件吗？',
      success: (res) => {
        if (res.confirm) {
          app.globalData.events.splice(index, 1)
          this.setData({
            events: app.globalData.events
          })
          wx.showToast({
            title: '删除成功',
            icon: 'success',
          })
        }
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.loadEvents()
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    this.loadEvents()
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})