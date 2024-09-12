// pages/newEvent/newEvent.js
Page({

  /**
   * Page initial data
   */
  data: {
    data: {
      event: { // 默认事件对象
        name: '',
        location: '',
        date: '',
        time: '',
        members: [] // 成员列表初始化为空数组
      },
      isUpdating: false, // 标记是否为编辑模式
      eventIdx: null
    },
  },
  bindDateChange: function(e) {
    this.setData({
      'event.date': e.detail.value
    });
  },
  // 选择时间时触发
  bindTimeChange: function(e) {
    this.setData({
      'event.time': e.detail.value
    });
  },
  handleInputChange: function(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    console.log("field: " + field)
    this.setData({
      [`event.${field}`]: value
    })
  },
  // 表单提交事件
  formSubmit: function(e) {
    const app = getApp();
    const event = this.data.event;
    if (this.data.isUpdate) {
      app.globalData.events[eventIdx] = event;
    } else {
      app.globalData.events.push(event);
    }

    // 这里可以将数据发送到服务器或者进行其他处理
    wx.showToast({
      title: this.data.isUpdate ? '事件已更新' : '事件已创建',
      icon: 'success',
    });
    setTimeout(() => wx.navigateBack(), 1500)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const index = options.index;
    const app = getApp();
    console.log("index: " + index)
    if (index != undefined && index != null) {
      this.setData({
        event: app.globalData.events[index],
        isUpdate: true,
        eventIdx: index
      })
    }
  },
  cancelSubmit: function(e) {
    wx.navigateBack()
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