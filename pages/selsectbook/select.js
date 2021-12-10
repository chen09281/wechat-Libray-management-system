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


        // 向服务端发送请求
        wx.request({
            url: 'http://47.106.189.98:8899/book/getbyid',
            data: {
                id: e.detail.value.id,
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'get',
            dataType: 'json',
            // 成功返回
            success: function (res) {
                console.log(res.data);
                let data = res.data;
                console.log("查询成功")
                app.globalData.id = res.data.id;
                app.globalData.name = data.id;
                app.globalData.isbn = data.isbn;
                app.globalData.authors = data.authors;
                app.globalData.press = data.press;
                app.globalData.photo = data.photo;
                self.setData({
                    id: app.globalData.id,
                    name: app.globalData.name,
                    isbn: app.globalData.isbn,
                    authors: app.globalData.authors,
                    press: app.globalData.press,
                    photo: app.globalData.photo
                })
            }
        })
    }
})