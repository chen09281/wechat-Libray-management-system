const app = getApp()

Page({
    data: {

    },
    onLoad: function (option) {
        self = this;
    },
    // 识别文本是否为空
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
    // 查询按钮功能
    formSubmit: function (e) {
        // var id = {}; // 新建第一个id对象
        // id.id = e.detail.id;
        // wx.setStorageSync('id', id); // id使用同步

        // 向服务端发送请求
        wx.request({
            url: 'http://47.106.189.98:8899/bookcontent/getbybookid',
            data: {
                book_id: e.detail.value.id,
            },
            header: {
                'content-type': 'Application/json'
            },
            method: 'get',
            dataType: 'json',
            // 成功返回
            success: function (res) {
                console.log(res.data);
                let data = res.data;
                console.log("查询成功")
                app.globalData.content = data[data.length-1].content;
                self.setData({
                    value: app.globalData.content
                })
            },
            fail: function (error) {
                console.log(error);
            }
        })
    }
})