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

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const app = getApp();
    this.setData({
      events: app.globalData.events
    })
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
    const app = getApp();
    this.setData({
      events: app.globalData.events
    })
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