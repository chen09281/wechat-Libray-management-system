const app = getApp()
Page({
  data: {
    disabled: true,
    btnstate: "default",
    result:'qwerty',
    src: ''
  },
  // 跳转
  submit:function(e){
    wx.navigateTo({
      url: '../newbook/newbook',
    })
  },
  select:function(e){
    wx.navigateTo({
      url: '../selsectbook/select',
    })
  },
  onLoad: function (options) {
    self = this;
    // 向服务端发送请求
    wx.request({
      url: 'http://47.106.189.98:8899/book/getall',
      method: 'get',
      dataType: 'json',
      filePath: this.data.src,
      name: 'photo',
      header: {
        'content-type': 'Application/json'
      },
      // 成功返回
      success: function (res) {
        let data = res.data
        console.log(data);
        if (res.data.length > 0) {
          console.log('转跳成功');
        app.globalData.id = res.data[0].id;
        app.globalData.name = res.data[0].name;
        app.globalData.isbn = res.data[0].isbn;
        app.globalData.photo = res.data[0].photo;
        };
        self.setData({
          id: app.globalData.id,
          name:app.globalData.name,
          photo:app.globalData.photo
        })
      }
    });
  },
})