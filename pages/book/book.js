const app = getApp()
Page({
  data: {
    book:''
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
        };
        self.setData({
          book:data
        })
      }
    });
  },
})