const app = getApp()

Page({
    data:{
        note:''
    },
    onLoad:function(){

    },
    accountblur: function (e) {
        var content = e.detail.value;
        if (content != "") {
            this.setData({
                disabled: false,
                btnstate: 'primary'
            });
        } else {
            this.setData({
                disabled: true,
                btnstate: 'default'
            })
        }
    },
    formSubmit:function(e){
        wx.request({
          url: 'http://47.106.189.98:8899/userbooknote/add',
          data:{
              user_id:app.globalData.user_id,
              book_id:e.detail.value.bookid,
              note:e.detail.value.note
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method:'post',
          dataType:'json',
          success:function(res){
              console.log(app.globalData.user_id)
              console.log(res);
            //   let data = JSON.parse(res.data)
            //   console.log(data)
            console.log('上传成功')
          },
          fail:function(error){
              console.log(error);
          }
        })
    }
})