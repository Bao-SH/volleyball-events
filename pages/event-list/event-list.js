const { sortEventsByDate } = require('../../utils/util')
Page({

  /**
   * Page initial data
   */
  data: {
    showSlide: false,
    currentSlideId: null,
    isLoading: true,
    buttons: [
      {
        type: 'warn',
        text: '删除',
        extClass: 'delete-btn',
      },
    ],
    events: [],

  },
  
  createEvent: function() {
    wx.navigateTo({
      url: '/pages/event-detail/event-detail', // 指定要跳转的页面路径
    });
  },
  loadEvents: function() {
    const app = getApp();
    let events = app.globalData.events;
    //根据时间进行排序
    const sortedEvents = sortEventsByDate(events)
    //处理名字过长
    const processedEvents = sortedEvents.map(event => {
      return {
        ...event,
        displayName: event.name.length > 10 ? event.name.slice(0, 10) + '...' : event.name
      };
    });
    app.globalData.events = processedEvents
    this.setData({
      events: app.globalData.events,
      isLoading: false
    });
    console.log(app.globalData.events)
  },

  slideButtonTap: function(e) {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除此事件吗？',
      success: (res) => {
        if (res.confirm) {
          this.handleDeleteEvent(e)
        }
      }
    });
  },
  editEvent: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/event-detail/event-detail?id=${id}` // 跳转到事件详情页面，并传递事件索引
    });
  },
  // 处理删除事件
  handleDeleteEvent(e) {
    const eventId = e.currentTarget.dataset.id;
    const app = getApp();
    const updatedEvents = app.globalData.events.filter(event => event.id !== eventId);
          app.globalData.events = updatedEvents;
          this.setData({
            events: app.globalData.events
          })
    wx.showToast({
      title: '删除成功',
      icon: 'success',
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