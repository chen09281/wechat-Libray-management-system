const app = getApp()

Page({
    data:{

    },
    // 识别文本框是否为空
    accountblur:function(e){
        var content = e.detail.value;
        if(content != ""){
            this.setData({
                disable:false,
                btnstate:'primary'
            });
        } else {
            this.setData({
                disable:true,
                btnstate:'default'
            })
        }
    },
    // 添加按钮功能
    formSubmit:function(e){
        var id = {}; // 新建一个id对象
        id.id = e.detail.id;
        id.content = e.detail.content;
        wx.setStorageSync('id', id); // id使用同步

        // 向服务端上传数据
        wx.uploadFile({
          url: 'http://47.106.189.98:8899/bookcontent/add',
          header:{
            'content-type': 'Application/json'
          },
          method:'post',
          formData:{
              id:e.detail.value.id,
              content:e.detail.value.content
          },
          // 成功执行以下代码
          success:function(res){
              console.log('上传成功');
          },
          // 错误返回
          fail:function(res){
              wx.showToast({
                title: '错误',
                icon:'error'
              })
          }
        })
    }
})