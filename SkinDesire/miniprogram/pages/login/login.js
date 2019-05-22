const app = getApp()

const db = wx.cloud.database()
const userInfoCollection = db.collection('userInfo')

Page({

  // 页面的初始数据
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  // 生命周期函数--监听页面加载
  onLoad: function(options) {
		let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {         
					wx.getUserInfo({
						success: function(res) {
							that.updateUserInfo(res.userInfo)
						}
					})				
					this.redirectToIndex()
        }
      }
    })
  },

  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      this.addUserInfo(e.detail.userInfo)
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权'
      })
    }
  },

  addUserInfo(userInfo) {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        app.globalData.openid = res.result.openid
        userInfoCollection.where({
            _openid: app.globalData.openid
          })
          .count()
          .then(res => {
            if (res.total == 0) {
              userInfoCollection.add({
                data: userInfo
              })
							// console.log('添加成功')
							this.redirectToIndex()
            }
          })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  updateUserInfo(userInfo) {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        app.globalData.openid = res.result.openid
        userInfoCollection.where({
					_openid: app.globalData.openid
				}).get()
					.then(res => {
						userInfoCollection.doc(res.data[0]._id).update({
							data: userInfo
						})
						// console.log('更新成功')
					})
			},
			fail: err => {
				console.error('[云函数] [login] 调用失败', err)
			}
    })
  },

	redirectToIndex(){
		wx.redirectTo({
			url: '../index/index',
		})
	}
})