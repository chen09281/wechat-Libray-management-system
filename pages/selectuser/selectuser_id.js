const app = getApp()

Page({
  data:{},
  formSubmit:function(e){
    // 向服务器发送请求
    wx.request({
      url: 'http://47.106.189.98:8899/userbooknote/getbyuserid',
      data:{
        user_id:e.detail.value.userid
      },
      header:{
        'content-type': 'Application/json'
      },
      method:'get',
      dataType:'json',
      // 成功
      success:function(res){
        console.log(res.data)
      },
      failL:function(error){
        console.log(error);
      }
    })
  },
})