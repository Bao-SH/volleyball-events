// pages/newEvent/newEvent.js
Page({

  /**
   * Page initial data
   */
  data: {
    date: '',
    time: '',
    members: '',
  },
  bindDateChange: function(e) {
    console.log(e)
    this.setData({
      date: e.detail.value
    });
  },
    // 选择时间时触发
    bindTimeChange: function(e) {
      this.setData({
        time: e.detail.value
      });
    },
    // 表单提交事件
  formSubmit: function(e) {
    const formData = e.detail.value;

    // 创建 Event 对象
    const newEvent = {
      eventName: formData.eventName,
      location: formData.location,
      date: this.data.date,
      time: this.data.time,
      members: '',
    };

    const app = getApp();
    // 将新事件添加到全局 events 列表中
    app.globalData.events.push(newEvent);

    // 打印所有事件
    console.log('All events:', app.globalData.events);

    // 这里可以将数据发送到服务器或者进行其他处理
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    });

    // 重置表单
    this.setData({
      date: '',
      time: '',
      members: ''
    });
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