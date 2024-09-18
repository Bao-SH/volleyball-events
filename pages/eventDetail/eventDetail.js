import CustomPage from '../../base/CustomPage'

CustomPage({
    data: {
        showTopTips: false,
        isAgree: false,
        defaultName: "默认事件",
        defaultLocation: "默认地点",
        date:"",
        startTime:"",
        endTime:"",
        formData: {
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