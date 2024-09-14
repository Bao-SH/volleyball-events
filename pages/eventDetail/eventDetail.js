// pages/newEvent/newEvent.js
const { validateTime } = require('../../utils/util');
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
    if (!date || !startTime) {
      wx.showToast({
        title: '日期和时间不能为空',
        icon: 'none'
      })
      return
    }
    if (!endTime) {
      this.setData({
        'event.endTime': startTime
      })
    }
    if (!validateTime(startTime, endTime)) {
      wx.showToast({
        title: '结束时间不能早于开始时间',
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
    this.saveICSFile(event)
    wx.showToast({
      title: '事件已保存',
      icon: 'success',
    });
    setTimeout(() => wx.navigateBack(), 1500)
  },

  generateICS: function(event) {
    const { name, location, date, startTime, endTime } = event
    const icsContent = `BEGIN:VCALENDAR
      VERSION:2.0
      PRODID:-//Your App Name//Your App Version//EN
      BEGIN:VEVENT
      UID:${new Date().getTime()}@eventexample.com
      DTSTAMP:${this.formatToICSDateTime(new Date())}
      DTSTART:${this.formatToICSDateTime(new Date(`${date}T${startTime}:00`))}
      DTEND:${this.formatToICSDateTime(new Date(`${date}T${endTime}:00`))}
      SUMMARY:${name}
      DESCRIPTION:事件详情
      LOCATION:${location}
      END:VEVENT
      END:VCALENDAR`
      return icsContent
  },
  formatToICSDateTime: function(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  },
  saveICSFile: function(event) {
    const icsContent = this.generateICS(event);
    const fs = wx.getFileSystemManager();
    const filePath = `${wx.env.USER_DATA_PATH}/event.ics`;
    console.log("filePath: " + filePath)
    fs.writeFile({
      filePath: filePath,
      data: icsContent,
      encoding: 'utf8',
      success() {
        wx.openDocument({
          filePath: filePath,
          fileType: 'ics',
          success() {
            console.log('ICS 文件已打开');
          },
          fail(err) {
            console.log('ICS文件打开失败',err)
          }
        });
      },
      fail(err) {
        console.log('文件保存失败', err);
      },
      complete() {
        console.log('文件保存complete')
      }
    });
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