const app =getApp()

Page({
  data:{
    disabled:true,
    btnstate:"default"
  },
  // 识别文本框是否为空
  accountblur:function(e){
    var content = e.detail.value;
    if(content !=""){
       this.setData({disabled:false,btnstate:"primary"});
    }else{
      this.setData({disabled:true,btnstate:"default"});
    }
  },
  // 注册页面转跳
  register:function(e){
    wx.navigateTo({
      url: '../register/register',
    });
  },
  // 提交按钮的功能
  formSubmit:function(e){
    var user = {}; // 新建一个user对象
    user.account = e.detail.value.loginName;
    user.password = e.detail.value.password;
    wx.setStorageSync('user', user); // 使用同步
    // 向服务端发送请求
    wx.request({
      url: 'http://47.106.189.98:8899/user/getbynamepassword',
      data:{
        name:e.detail.value.loginName,
        password:e.detail.value.password
      },
      header:{'Content-Type':'application/x-www-form-urlencoded'},
      method:'get',
      dataType:'json',
      // 成功返回
      success:function(res){
        console.log(res.data);
        if (res.data.length > 0){
          wx.showToast({
            title: '登陆成功',
            icon:'success'
          });
          app.globalData.user_id = res.data[res.data.length-1].id;
          app.globalData.name = res.data[0].name;
          app.globalData.password = res.data[0].password;
          app.globalData.phone = res.data[0].phone;
          app.globalData.address = res.data[0].address;
          app.globalData.photo = res.data[0].photo;
          app.globalData.user_id = res.data[res.data.length-1].id;
          
          // 设置两秒后跳转
          setTimeout(function(){
            // console.log(app.globalData.user_id);
            wx.navigateTo({
              url: '../addnote/add',
            })
          },2000);
        } else {
          wx.showToast({
            title: '登陆失败',
            icon:'error'
          })
        }
      },
      // 请求失败
      faiil:function(res){
        console.log(res);
        wx.showToast({
          title: '网络错误请检查网络',
          icon:'error'
        })
      }
    })
  }

})