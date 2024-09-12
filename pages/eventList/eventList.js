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
      url: '/pages/eventDetail/eventDetail', // 指定要跳转的页面路径
    });
  },
  loadEvents: function() {
    const app = getApp();
    this.setData({
      events: app.globalData.events
    })
  },
  editEvent: function(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/eventDetail/eventDetail?id=${id}` // 跳转到事件详情页面，并传递事件索引
    });
  },
  deleteEvent: function(e) {
    const id = e.currentTarget.dataset.id;
    const app = getApp();
    wx.showModal({
      title: '确认删除',
      content: '确定要删除此事件吗？',
      success: (res) => {
        if (res.confirm) {
          const updatedEvents = app.globalData.events.filter(event => event.id !== eventId);
          app.globalData.events = updatedEvents;
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