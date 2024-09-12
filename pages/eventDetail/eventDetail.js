// pages/newEvent/newEvent.js
Page({

  /**
   * Page initial data
   */
  data: {
    event: { // 默认事件对象
      id: '',
      name: '',
      location: '',
      date: '',
      startTime: '',
      endTime: '',
      members: [] // 成员列表初始化为空数组
    },
    isUpdate: false,
    isEditing: false, // 标记是否为编辑模式
  },
  bindDateChange: function(e) {
    this.setData({
      'event.date': e.detail.value
    });
  },
  handleInputChange: function(e) {
    console.log(e)
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    this.setData({
      [`event.${field}`]: value
    })
  },
  // 表单提交事件
  formSubmit: function(e) {
    const app = getApp()
    const event = this.data.event
    const {name, date, startTime, endTime} = this.data.event
    if (!date || !startTime || !endTime) {
      wx.showToast({
        title: '日期和时间不能为空',
        icon: 'none'
      })
      return
    }
    if (!name) {
      this.setData({
        'event.name': '默认事件'
      })
    }

    this.reverseIsEditing()

    if (this.data.isUpdate) {
      const updatedEvents = [...app.globalData.events.filter(e => e.id !== event.id), event];
      app.globalData.events = updatedEvents;
    } else {
      event.id = app.globalData.eventIdCounter++
      app.globalData.events.push(event);
    }
    // 这里可以将数据发送到服务器或者进行其他处理
    wx.showToast({
      title: '事件已保存',
      icon: 'success',
    });
    setTimeout(() => wx.navigateBack(), 1500)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const app = getApp();
    const eventId = options.id;
    console.log("eventId: " + eventId)
    if (eventId) {
      const event = app.globalData.events.find(event => event.id == eventId);
      if (event) {
        //更新模式
        this.setData({
          event: event,
          isUpdate: true,
        })
      } else {
        wx.showToast({
          title: '未找到该事件，将新建事件',
          icon: 'none'
        })
      }
    }
    else {
      //新建模式，进入页面时不允许编辑
      this.reverseIsEditing()
    }
  },
  reverseIsEditing: function() {
    this.setData({
      isEditing: !this.data.isEditing
    });
    console.log("reversed isEditing: " + this.data.isEditing)
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