// pages/request/request.js
Page({

  /**
   * Page initial data
   */
  data: {
    responseCode: null
  },
  writeStorage: function(e){
    wx.setStorage({
      key: "myKey",
      data: "myValue",
      success: function() {
        console.log("写入缓存成功")
      },
      fail: function() {
        console.log("写入缓存失败")
      }
    })
  },
  scanCode: function(e) {
    wx.scanCode({
      success: function(res) {
        console.log("scan code successfully")
      },
      fail: function(res) {
        console.log("scan code failed: " + res.errMsg)
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    
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