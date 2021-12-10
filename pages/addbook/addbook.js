const app = getApp()

Page({
    data:{
        text:'',
        getInput:'',
        content:'',
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
    getInput(e){
        this.setData({
            text:e.detail.value
        })
    },
    // 添加按钮功能
    formSubmit:function(e){
        var that = this
        console.log(this.data.content)
        // 向服务端上传数据
        wx.request({
          url: 'http://47.106.189.98:8899/bookcontent/add',
          header:{
            'content-type': 'application/x-www-form-urlencoded'
          },
          method:'post',
          dataType:'json',
          data:{
              book_id:e.detail.value.id,
              content:e.detail.value.content
          },
          // 成功执行以下代码
          success:function(res){
              console.log(res);
            //   let data = JSON.parse(that.data);
            //   console.log(data)
              console.log('上传成功');
          },
          // 错误返回
          fail:function(error){
              console.log(typeof(e.detail.value.content));
              console.log(e.detail.value.content)
              console.log(error);
          }
        })
    }
})