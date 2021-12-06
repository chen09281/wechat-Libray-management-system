const app = getApp()

Page({
  data: {
    disabled: true,
    btnstate: "default",
    src: ''
  },
  // 识别文本框是否为空
  accountblur: function (e) {
    var content = e.detail.value;
    if (content != "") {
      this.setData({
        disabled: false,
        btnstate: "primary"
      });
    } else {
      this.setData({
        disabled: true,
        btnstate: "default"
      });
    }
  },

  // 选择头像的方法
  photo: function (e) {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 1,
      // 成功返回的值
      success: function (res) {
        var temp = res.tempFilePaths;
        console.log(temp);
        that.setData({
          src: temp[0]
        })
      }
    })
  },
  // 提交按钮功能
  formSubmit: function (e) {
    var user = {}; // 新建user对象
    user.account = e.detail.value.loginName;
    user.password = e.detail.value.password;
    user.phone = e.detail.value.phone;
    user.address = e.detail.value.address;
    wx.setStorageSync('user', user); // user对象使用同步

    // 向服务端上传数据
    wx.uploadFile({
      url: 'http://47.106.189.98:8899/user/add',
      filePath: this.data.src,
      name: 'photo',
      header: {
        'content-type': 'Application/json'
      },
      formData: {
        name: e.detail.value.loginName,
        password: e.detail.value.password,
        phone: e.detail.value.phone,
        address: e.detail.value.address
      },
      // 成功执行以下代码
      success: function (res) {
        console.log(res);
        let data = JSON.parse(res.data)
        console.log(data)
        // 弹框
        wx.showToast({
          title: '注册成功',
          icon: 'success'
        });
        app.globalData.name = data.name;
        app.globalData.password = data.password;
        app.globalData.phone = data.phone;
        app.globalData.address = data.address;
        app.globalData.photo = data.photo;
        // 设置两秒后跳转到login页面
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/user/login',
          })
        }, 2000);
      },
      // 错误返回
      fail: function (res) {
        console.log(res);
        wx.showToast({
          title: '请输入相关信息',
          icon: 'error'
        })
      }
    })
  }
})