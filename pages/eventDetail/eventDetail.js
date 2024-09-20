import CustomPage from '../../base/CustomPage'

CustomPage({
    data: {
      showTopTips: false,
      defaultName: "默认事件",
      defaultLocation: "默认地点",
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
    // onLoad: function(options) {
    //   const {id} = options;
    //   if (id) {
    //     this.setData({
    //       id: id,
    //       isCreate: false
    //     })
    //     console.log("id now: " + id)
    //     this.loadEventDetail(id);
    //   }
    // },
    // 从 globalData 中加载事件详情
    // loadEventDetail: function(id) {
    //   const eventId = Number(id)
    //   const app = getApp()
    //   console.log(app.globalData.events)
    //   const event = app.globalData.events.find(item => item.id === eventId);
    //   if (event) {
    //     this.setData({
    //       formData: {
    //         name: event.name,
    //         date: event.date,
    //         startTime: event.startTime,
    //         endTime: event.endTime,
    //         location: event.location
    //       }
    //     });
    //   } else {
    //     // 如果没有找到对应的事件，显示错误提示
    //     this.setData({ error: '未找到对应的事件' });
    //   }
    // },
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
          console.log(this.data.formData)
          if (!valid) {
              const firstError = Object.keys(errors)
              if (firstError.length) {
                  this.setData({
                      error: errors[firstError[0]].message
                  })
              }
          } else {
              const app = getApp()
              this.setData({
                [`formData.id`]: app.globalData.eventIdCounter++
              })
              if (this.data.formData.name === undefined) {
                  this.setData({
                      [`formData.name`]: this.data.defaultName
                  })
              }
              if (this.data.formData.location === undefined) {
                  this.setData({
                      [`formData.location`]: this.data.defaultLocation
                  })
              }
              app.globalData.events.push(this.data.formData)
              wx.showToast({
                  title: '事件已创建'
              }).then(r => wx.navigateBack())
          }
      })
    }
});