const { sortEventsByDate } = require('../../utils/util')
Page({

  /**
   * Page initial data
   */
  data: {
    buttons: [
      {
        type: 'warn',
        text: '删除',
        extClass: 'delete-btn',
      }
    ],
    events: [] 
  },
  createEvent: function() {
    wx.navigateTo({
      url: '/pages/eventDetail/eventDetail', // 指定要跳转的页面路径
    });
  },
  loadEvents: function() {
    const app = getApp();
    let events = app.globalData.events;
    //处理名字过长
    const processedEvents = events.map(event => {
      return {
        ...event,
        displayName: event.name.length > 10 ? event.name.slice(0, 10) + '...' : event.name
      };
    });
    const sortedEvents = sortEventsByDate(processedEvents)
    this.setData({
      events: sortedEvents
    });
  },

  slideButtonTap: function(e) {
    console.log("enter button tap")
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认删除',
      content: '您确定要删除此事件吗？',
      success: (res) => {
        if (res.confirm) {
          // 触发父组件的删除事件
          this.triggerEvent('deleteEvent', { id });
        }
      }
    });
  },
  editEvent: function(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/eventDetail/eventDetail?id=${id}` // 跳转到事件详情页面，并传递事件索引
    });
  },
  // 处理删除事件
  handleDeleteEvent(e) {
    const { id } = e.detail;
    const newEvents = this.data.events.filter(event => event.id !== id);
    this.setData({ events: newEvents });
    wx.showToast({ title: '事件已删除', icon: 'success', duration: 2000 });
  },
  deleteEvent: function(e) {
    const eventId = e.currentTarget.dataset.id;
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