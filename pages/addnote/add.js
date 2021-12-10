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
          url: 'http://47.106.198.98:8899/userbooknote/add',
          formdata:{
              user_id:app.globalData.user_id,
              book_id:e.detail.value.bookid,
              note:e.detail.value.note
          },
          header: {
            'content-type': 'Application/json'
          },
          method:'post',
          success:function(res){
              console.log(res);
              let data = JSON.parse(res.data)
              console.log(data)
          },
          fail:function(error){
              console.log(error);
          }
        })
    }
})