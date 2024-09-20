import CustomPage from '../../base/CustomPage'

CustomPage({
    data: {
      showTopTips: false,
      defaultName: "默认事件",
      defaultLocation: "默认地点",
      isCreate: true,
      isEditable: false,
      eventId: null,
      date:"",
      startTime:"",
      endTime:"",
      formData: {
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        location: ''
      },
      rules: [{
          name: 'name',
          rules: {required: false},
      }, {
        name: 'date',
        rules: {required: true, message: "请输入日期"}
      }, {
        name: 'startTime',
        rules: {required: true, message: "请输入开始时间"}
      }, {
        name: 'location',
        rules: {required: false}
      },
      ]
    },
    onLoad: function(options) {
      const {id} = options;
      if (id) {
        this.setData({
          eventId: Number(id),
          isCreate: false
        })
        console.log("event id: " + this.data.eventId)
        this.loadEventDetail(this.data.eventId);
      }
    },
    // 从 globalData 中加载事件详情
    loadEventDetail: function(eventId) {
      const app = getApp()
      const event = app.globalData.events.find(item => item.id === eventId);
      if (event) {
        this.setData({
          formData: {
            name: event.name,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            location: event.location,
            id:null
          },
          date: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
        });
      } else {
        this.setData({ error: '未找到对应的事件' });
        wx.navigateBack({
        })
      }
    },
    bindDateChange: function (e) {
        this.setData({
          date: e.detail.value,
          [`formData.date`]: e.detail.value
        })
    },
    formInputChange(e) {
        const {field} = e.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: e.detail.value
        })
    },
    bindStartTimeChange: function (e) {
      this.setData({
        startTime: e.detail.value,
        [`formData.startTime`]: e.detail.value
      })
    },
    bindEndTimeChange: function (e) {
      this.setData({
        endTime: e.detail.value,
        [`formData.endTime`]: e.detail.value
      })
    },
    submitForm() {
      this.selectComponent('#form').validate((valid, errors) => {
          console.log('valid', valid, errors)
          if (!valid) {
              const firstError = Object.keys(errors)
              if (firstError.length) {
                  this.setData({
                      error: errors[firstError[0]].message
                  })
              }
          } else {
              const app = getApp()
              if (this.data.isCreate) {
                this.setData({
                [`formData.id`]: app.globalData.eventIdCounter++
              })
              } else {
                this.setData({
                  [`formData.id`]: this.data.eventId
                })
              }
              if (this.data.formData.name === undefined || this.data.formData.name === "") {
                  this.setData({
                      [`formData.name`]: this.data.defaultName
                  })
              }
              if (this.data.formData.location === undefined || this.data.formData.location === "") {
                  this.setData({
                      [`formData.location`]: this.data.defaultLocation
                  })
              }
              if (this.data.isCreate) {
                app.globalData.events.push(this.data.formData)
                wx.showToast({
                    title: '事件已创建',
                    icon: 'success',
                    duration: 2000
                })
              } else {
                //更新现有的事件
                const index = app.globalData.events.findIndex(event => event.id === this.data.eventId);
                if (index !== -1) {
                  app.globalData.events[index] = { ...this.data.formData };
                  wx.showToast({
                    title: '修改已保存',
                    icon: 'success',
                  });
                } else {
                  wx.showToast({
                    title: '修改失败，事件未找到',
                    icon: 'error',
                  })
                }
              }
              setTimeout(() => wx.navigateBack(), 1500)
          }
      })
    }
});