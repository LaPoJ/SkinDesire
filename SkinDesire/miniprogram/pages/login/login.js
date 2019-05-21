const app = getApp()

const db = wx.cloud.database()
const userInfoCollection = db.collection('userInfo')

Page({

  // 页面的初始数据
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '../index/index'
          })
        }
      }
    })

  },

  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          userInfoCollection.where({
            _openid: app.globalData.openid
          })
            .get()
            .then(res => {
              if (res.data.length == 0) {
                userInfoCollection.add({
                  data: e.detail.userInfo
                })
                // console.log('添加成功')
              }else {
                userInfoCollection.doc(res.data[0]._id).update({
                  data: e.detail.userInfo
                })
              }
            })
          wx.redirectTo({
            url: '../index/index',
          })
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        },
      })
    }else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权'
      })
    }
  }
})