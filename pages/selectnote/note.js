// pages/selectnote/note.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit:function(e){
    // 发送请求
    wx.request({
      url: 'http://47.106.189.98:8899/userbooknote/getbyuseridbookid',
      header:{
        'content-type': 'Application/json'
      },
      method:'get',
      dataType:'json',
      data:{
        user_id:e.detail.value.userid,
        book_id:e.detail.value.bookid
      },
      success:function(res){
        console.log(res.data)
      },
      fail:function(error){
        console.log(error)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})